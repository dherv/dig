// pages/profile.js

import { getProfile } from "@/api/profile/[...id]";
import Avatar from "@/layout/Avatar";
import { ErrorService } from "@/services/error";
import {
  supabaseClient,
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function Profile({
  user,
  profile,
}: {
  user: User;
  profile: { avatar_url: string; username: string };
}) {
  const { mutate } = useSWRConfig();

  const [username, setUsername] = useState<string>(profile?.username);
  const [avatar_url, setAvatarUrl] = useState<string>(profile?.avatar_url);
  const [loading, setLoading] = useState(false);

  // const removePreviousAvatar = async (url: string) => {
  //   try {
  //      await supabaseClient.storage
  //       .from("avatars")
  //       .remove([`/${url}`]);
  //   } catch (e) {
  //     ErrorService.catchError(error);
  //   }
  // };

  // NOTE: can also read state variables directly instead of passing them as args
  // https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
  const updateProfile = async ({ username, avatar_url }) => {
    try {
      setLoading(true);

      // TODO: remove previous avatar
      const previousAvatar = profile.avatar_url;

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabaseClient.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      // invalidate profile so Nav can re-update
      mutate(`/api/profile/${user.id}`);
      // TODO: remove previous avatar
      // removePreviousAvatar(previousAvatar);
    } catch (error) {
      ErrorService.catchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (url: string) => {
    try {
      setAvatarUrl(url);
      setLoading(false);
    } catch (error) {
      ErrorService.catchError(error);
    }
  };

  return (
    <form>
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        name="username"
        value={username}
        onChange={(event) => setUsername(event?.target.value)}
      />

      <Avatar
        url={avatar_url}
        size={150}
        onUpload={handleUpload}
        onUploadLoading={(state: boolean) => setLoading(state)}
      />
      <button
        disabled={loading}
        onClick={() => updateProfile({ username, avatar_url })}
      >
        submit
      </button>
    </form>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    try {
      const { user, error } = await supabaseServerClient(
        ctx
      ).auth.api.getUserByCookie(ctx.req);

      if (error) {
        ErrorService;
        return { props: { profile: null } };
      }

      if (user) {
        const profile = await getProfile(user?.id);
        return { props: { profile } };
      }
    } catch (error) {
      ErrorService.catchError(error);
      return { props: { profile: null } };
    }
  },
});
