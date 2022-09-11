import { getUser, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";
import { supabaseServer } from "../../../services/supabase/supabase";

export const getProfile = async (userId: string | string[]) => {
  try {
    const { data, error } = await supabaseServer
      .from("profiles")
      .select(`username, avatar_url`)
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    ErrorService.catchError(error);
    throw error;
  }
};

export default async function Profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // refresh the token
  // TODO: add to middleware? - move to page middleware
  const { user, accessToken } = await getUser({ req, res });
  try {
    // TODO - add refresh token in middleware
    await supabaseServerClient({ req, res }).auth.setAuth(accessToken);
    const data = await getProfile(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    const message = ErrorService.getErrorMessage(error);
    ErrorService.reportError({ message });
    return res.status(500).json({ message });
  }
}
