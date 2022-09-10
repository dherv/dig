import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../services/supabase/supabase";
import * as TMDB from "../../../services/tmdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user } = await supabaseServer.auth.api.getUserByCookie(req);
    if (user) {
      const { data: suggestions, error } = await supabaseServer
        .from("suggestions")
        .select(`id, show_id, show_media_type(type)`)
        .match({ user_id: user.id });
      // query the movie database
      // query movie

      const data = await Promise.all(
        suggestions?.map(async (suggestion) => ({
          // user: suggestion.user_id,
          show: await TMDB.getShow(
            suggestion.show_media_type.type,
            suggestion.show_id
          ),
        }))
      );

      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
}
