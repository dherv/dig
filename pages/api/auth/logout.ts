import {
  getUser,
  supabaseServerClient,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";

export default withApiAuth(async function Logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accessToken } = await getUser({ req, res });
    if (accessToken) {
      await supabaseServerClient({ req, res }).auth.api.signOut(accessToken);
    }

    return res.status(200).json({ data: { message: "sign out successful" } });
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
});
