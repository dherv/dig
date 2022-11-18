import { ErrorService } from "@/services/error";
import { supabaseServer } from "@/services/supabase/supabase";
import {
  Suggestion,
  SuggestionSchemaWithRelations,
} from "@/services/supabase/types.app";
import * as TMDB from "@/services/tmdb";
import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuth(async function handler(
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

      console.log({ suggestions });
      const suggestionMapper = async (
        suggestion: SuggestionSchemaWithRelations
      ): Promise<Suggestion> => ({
        id: suggestion.id,
        show: await TMDB.getShow(
          suggestion.show_media_type.type,
          suggestion.show_id
        ),
      });

      if (suggestions) {
        const data = await Promise.all(suggestions.map(suggestionMapper));
        return res.status(200).json(data);
      } else {
        // TODO: add unit/int test since need to pass empty array !!
        return res.status(200).json([]);
      }
    }
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
});
