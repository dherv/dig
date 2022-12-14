import {
  createServerSupabaseClient,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";
import { supabaseServer } from "../../../services/supabase/supabase";
import { definitions } from "../../../services/supabase/types.database";

export default withApiAuth(async function Accepted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { token, user } = await supabaseServer.auth.api.getUserByCookie(req);

    const supabase = createServerSupabaseClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      // TODO: see if we can find a query to select depending on user_1 = user.id or user_2 = user.id instead of 2 queries
      const { data: friendshipFromColUser1 } =
        (await supabaseServer
          .from<definitions["friendships"]>("friendships")
          .select(`id, user_1(id, username)`)
          .eq(`user_2`, user.id)) ?? [];

      // TODO: add unit test to check we always get an array. if null we can not map
      const { data: friendshipFromColUser2 } =
        (await supabaseServer
          .from<definitions["friendships"]>("friendships")
          .select(`id, user_2(id, username)`)
          .eq(`user_1`, user.id)) ?? [];

      const data = {
        friendships: [
          ...(friendshipFromColUser1?.map((friendship) => friendship.id) ?? []),
          ...(friendshipFromColUser2?.map((friendship) => friendship.id) ?? []),
        ],
        friends: [
          ...(friendshipFromColUser1?.map((friendship) => friendship.user_1) ??
            []),
          ...(friendshipFromColUser2?.map((friendship) => friendship.user_2) ??
            []),
        ],
      };

      return res.status(200).json({ ...data });
    }
  } catch (error) {
    ErrorService.apiError(error, res);
  }
});
