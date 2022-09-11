import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../services/supabase/supabase";
import * as TMDB from "../../../services/tmdb";

// TODO: 1 - recevied and sent are pretty similar - see if can combine
// TODO: 2 - need to group by movie to get suggestion list of friends
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { friendshipIds, friendIds } = JSON.parse(req.body);
    const { data: suggestions, error } = await supabaseServer
      .from("suggestions")
      .select(
        `id, show_id, user_id(username, avatar_url), show_media_type(type)`
      )
      .or(`friendship_id.in.(${friendshipIds}), user_id.in.(${friendIds})`);

    const data = await Promise.all(
      suggestions?.map(async (suggestion) => ({
        user: suggestion.user_id,
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
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ message: error.message });
  }
}
