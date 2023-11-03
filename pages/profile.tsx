import { getProfile } from "@/api/profile/[...id]";
import { ProfileAvatar } from "@/components/layout/ProfileAvatar";
import { ErrorService } from "@/services/error";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Input } from "@mui/joy";
import {
  createServerSupabaseClient,
  User as IUser,
} from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextApiRequest, NextApiResponse } from "next";
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
  const supabaseClient = useSupabaseClient();

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

      // TODO: remove previous avatar if exist
      // const previousAvatar = profile?.avatar_url;

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
        {/* <Input
          label="username"
          placeholder="my name"
          id="username"
          value={username}
          onChange={(event) => setUsername(event?.target.value)}
        /> */}

        <Input
          // label="username"
          placeholder="my name"
          id="username"
          value={username}
          onChange={(event) => setUsername(event?.target.value)}
          startDecorator={<PersonRoundedIcon />}
          // endDecorator={
          //   <Chip size="sm" variant="soft">
          //     New stuff
          //   </Chip>
          // }
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
          onClick={(event) => {
            event.preventDefault();
            updateProfile({ username, avatar_url });
          }}
          className="mt-4 block md:w-44  sm:ml-1 px-8 py-2 text-sm font-medium text-white bg-pink-600 border border-pink-600 rounded active:text-pink-500 hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring"
        >
          Submit
        </button>
      </form>

      <div className="mt-12 relative">
        <h2 className="font-medium mb-4">Preview</h2>
        {/* <Avatar alt={username} src={avatar_url}></Avatar> */}
        <User avatarType="user" src={avatar_url} username={username} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // const { user, error } = await supabaseServerClient(
    //   ctx
    // ).auth.api.getUserByCookie(ctx.req);

    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      ErrorService.catchError("not_authenticated");
      return { props: { profile: null } };
      // return res.status(401).json({
      //   error: 'not_authenticated',
      //   description: 'The user does not have an active session or is not authenticated',
      // })
    }

    if (session.user) {
      const profile = await getProfile(session.user?.id);
      return { props: { profile } };
    }
    return { props: { profile: null } };
  } catch (error) {
    ErrorService.catchError(error);
    return { props: { profile: null } };
  }
};
