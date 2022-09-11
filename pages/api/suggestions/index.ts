import { ErrorService } from "@/services/error";
import { supabaseServer } from "@/services/supabase/supabase";
import { ShowMediaType } from "@/services/supabase/types.app";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { showId, showMediaType, userId, friendshipId } = JSON.parse(
        req.body
      );
      const { data, error } = await supabaseServer.from("suggestions").insert([
        {
          show_id: showId,
          show_media_type:
            showMediaType === "movie" ? ShowMediaType.Movie : ShowMediaType.TV,
          user_id: userId,
          friendship_id: friendshipId,
        },
      ]);
      if (error) {
        throw error;
      }
      return res.status(200).json(data);
    } catch (error) {
      return ErrorService.apiError(error, res);
    }
  }
}
