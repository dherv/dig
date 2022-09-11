import {
  supabaseServerClient,
  User,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";
import { supabaseServer } from "../../../services/supabase/supabase";
import { FriendshipStatus } from "../../../services/supabase/types";

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

export default withApiAuth(async function Accepted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token, user: newUser } = await supabaseServerClient({
      req,
      res,
    }).auth.api.getUserByCookie(req);

    if (newUser) {
      handleCreateFriendship(newUser);
    }
    return res.status(200).json({ data: { message: "sign out successful" } });
  } catch (e) {
    console.log("caught", e);
    return res.status(500).json({ message: error.message });
  }
});
