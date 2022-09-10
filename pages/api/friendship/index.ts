import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import error from "next/error";
import { supabaseServer } from "../../../services/supabase/supabase";

export default withApiAuth(async function Accepted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token, user } = await supabaseServer.auth.api.getUserByCookie(req);

    if (user) {
      // TODO: see if we can find a query to select depending on user_1 = user.id or user_2 = user.id instead of 2 queries
      const { data: data1 } = await supabaseServer
        .from("friendships")
        .select(`id, user_1(id, username)`)
        .eq(`user_2`, user.id);

      const { data: data2 } = await supabaseServer
        .from("friendships")
        .select(`id, user_2(id, username)`)
        .eq(`user_1`, user.id);

      const data = {
        friendships: [...data1?.map((f) => f.id), ...data2?.map((f) => f.id)],
        friends: [
          ...data1?.map((f) => f.user_1),
          ...data2?.map((f) => f.user_2),
        ],
      };

      return res.status(200).json({ ...data });
    }
  } catch (e) {
    console.log("caught", e);
    return res.status(500).json({ message: error.message });
  }
});
