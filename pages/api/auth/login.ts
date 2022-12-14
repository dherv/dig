import { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";
import { supabaseServer } from "../../../services/supabase/supabase";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      throw error;
    }

    return res.status(200).json({ data: { message: "login successful" } });
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
}
