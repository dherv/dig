import {
  getUser,
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // refresh the token
  // TODO: add to middleware? - move to page middleware
  const { user, accessToken } = await getUser({ req, res });
  try {
    await supabaseServerClient({ req, res }).auth.setAuth(accessToken);

    const { data, error } = await supabaseClient
      .from("profiles")
      .select(`username, avatar_url`)
      .eq("id", req.query.id)
      .single();

    if (error) {
      console.log({ error });
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
}
