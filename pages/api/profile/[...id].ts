import {
  getUser,
  supabaseServerClient,
  withApiAuth,
} from "@supabase/auth-helpers-nextjs";
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

export default withApiAuth(async function Profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // refresh the token
  // TODO: add to middleware? - move to page middleware
  const { accessToken } = await getUser({ req, res });
  try {
    // TODO - add refresh token in middleware
    if (accessToken) {
      supabaseServerClient({ req, res }).auth.setAuth(accessToken);
      const data = await getProfile(req.query.id);
      return res.status(200).json(data);
    }
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
});
