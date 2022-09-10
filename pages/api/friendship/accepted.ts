import {
  supabaseServerClient,
  User,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../utils/supabase/supabase";
import { FriendshipStatus } from "../../../utils/supabase/types";

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

    console.log({ friendData });
  } catch (e) {
    console.error({ e });
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
