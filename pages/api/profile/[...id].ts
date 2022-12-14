import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
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
  try {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const data = await getProfile(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
}
