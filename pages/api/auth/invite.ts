import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../utils/supabase/supabase";

export default withApiAuth(async function Invite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = JSON.parse(req.body);
    for (const email of body.emails as string[]) {
      await supabaseServer.auth.api.inviteUserByEmail(email);
    }
    return res.status(200).json({ data: { message: "invite successful" } });
  } catch (e) {
    console.log("caught", e);
    return res.status(500).json({ message: error.message });
  }
});
