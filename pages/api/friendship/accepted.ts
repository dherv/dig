import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";
import { supabaseServer } from "../../../services/supabase/supabase";
import { FriendshipStatus } from "../../../services/supabase/types.app";

const handleCreateFriendship = async (newUser: User) => {
  try {
    // TODO: replace by database function ? how to handle failure ?
    const { data: friendData, error: friendError } = await supabaseServer
      .from("friendships")
      .update({
        status: FriendshipStatus.Accepted,
      })
      .match({
        user_1: newUser.user_metadata.inviter,
        user_2: newUser.id,
      });
  } catch (error) {
    ErrorService.catchError(error);
  }
};

export default async function Accepted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      const user = session.user;
      if (user) {
        handleCreateFriendship(user);
      }
      return res.status(200).json({ data: { message: "sign out successful" } });
    }
  } catch (error) {
    ErrorService.apiError(error, res);
  }
}
