import {
  supabaseServerClient,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuth(async function Logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = await supabaseServerClient({
      req,
      res,
    }).auth.api.getUserByCookie(req);
    if (token) {
      await supabaseServerClient({ req, res }).auth.api.signOut(token);
    }

    return res.status(200).json({ data: { message: "sign out successful" } });
  } catch (e) {
    console.log("caught", e);
    return res.status(500).json({ message: error.message });
  }
});
