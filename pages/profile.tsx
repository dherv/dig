import { getProfile } from "@/api/profile/[...id]";
import { ProfileAvatar } from "@/components/layout/ProfileAvatar";
import { ErrorService } from "@/services/error";
import { Input } from "@nextui-org/react";
import {
  supabaseClient,
  supabaseServerClient,
  User as IUser,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { User } from "../components/layout/User";
export default function Profile({
  user,
  profile,
}: {
  user: IUser;
  profile: { avatar_url: string; username: string };
}) {
  const { mutate } = useSWRConfig();

  const [username, setUsername] = useState<string>(profile?.username);
  const [avatar_url, setAvatarUrl] = useState<string>(profile?.avatar_url);
  const [loading, setLoading] = useState(false);

  // NOTE: can also read state variables directly instead of passing them as args
  // https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
  const updateProfile = async ({
    username,
    avatar_url,
  }: {
    username: string;
    avatar_url: string;
  }) => {
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
    <div className="max-w-[fit-content] mx-auto my-8">
      <h2 className="font-medium mb-4">Update</h2>
      <form className="my-8">
        <Input
          label="username"
          placeholder="my name"
          id="username"
          value={username}
          onChange={(event) => setUsername(event?.target.value)}
        />
        <div className="mt-4">
          <ProfileAvatar
            url={avatar_url}
            size={150}
            onUpload={handleUpload}
            onUploadLoading={(state: boolean) => setLoading(state)}
          />
        </div>

        <button
          onClick={() => updateProfile({ username, avatar_url })}
          className="mt-4 block md:w-44  sm:ml-1 px-8 py-2 text-sm font-medium text-white bg-pink-600 border border-pink-600 rounded active:text-pink-500 hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring"
        >
          Submit
        </button>
      </form>

      <div className="mt-12 relative">
        <h2 className="font-medium mb-4">Preview</h2>
        <User avatarType="user" src={avatar_url} username={username} />
      </div>
    </div>
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
        ErrorService.catchError(error);
        return { props: { profile: null } };
      }

      if (user) {
        const profile = await getProfile(user?.id);
        return { props: { profile } };
      }
      return { props: { profile: null } };
    } catch (error) {
      ErrorService.catchError(error);
      return { props: { profile: null } };
    }
  },
});
