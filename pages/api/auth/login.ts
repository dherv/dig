import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);
    const supabase = createServerSupabaseClient({ req, res });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      throw error;
    }

    return res.status(200).json({ data: { message: "login successful" } });
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
}
