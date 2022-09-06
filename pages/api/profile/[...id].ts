import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select(`username, avatar_url`)
    .eq("id", req.query.id)
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(200).json(data);
}
