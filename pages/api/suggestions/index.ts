import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../services/supabase/supabase";
import { ShowMediaType } from "../../../services/types/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { showId, showMediaType, userId, friendshipId } = JSON.parse(
        req.body
      );
      console.log({ showMediaType });
      const { data, error } = await supabaseServer.from("suggestions").insert([
        {
          show_id: showId,
          show_media_type:
            showMediaType === "movie"
              ? ShowMediaType.Movie
              : ShowMediaType.Serie,
          user_id: userId,
          friendship_id: friendshipId,
        },
      ]);
      console.log({ data, error });
      return res.status(200).json(data);
    } catch (error) {
      console.error({ error });
      return res.status(500).json({ message: error.message });
    }
  }
}
