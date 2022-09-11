import {
  supabaseServerClient,
  User,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../services/supabase/supabase";
import { FriendshipStatus } from "../../../services/supabase/types";

const createFriendshipInvited = async (req: NextApiRequest, user: User) => {
  try {
    // TODO: replace by database function ? how to handle failure ?
    const { data, error } = await supabaseServer.from("friendships").insert([
      {
        user_1: user.user_metadata.inviter,
        user_2: user.id,
        status: FriendshipStatus.Invited,
      },
    ]);

    return data;
  } catch (e) {
    console.error({ e });
  }
};
export default withApiAuth(async function Invite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user } = await supabaseServerClient({
      req,
      res,
    }).auth.api.getUserByCookie(req);

    if (user) {
      const body = JSON.parse(req.body);
      for (const email of body.emails as string[]) {
        // invite by email
        const { data: invitedUser, error } =
          await supabaseServer.auth.api.inviteUserByEmail(email, {
            data: {
              inviter: user?.id,
            },
          });

        if (invitedUser) {
          await createFriendshipInvited(req, invitedUser);
        } else {
          throw new Error("no user data received from invite");
        }

        return res.status(200).json({ data: { message: "invite successful" } });
      }
    }
  } catch (e) {
    return res.status(500).json({ message: error.message });
  }
});
