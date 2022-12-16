import { ErrorService } from "@/services/error";
import { supabaseServer } from "@/services/supabase/supabase";
import {
  Suggestion,
  SuggestionSchemaWithRelations,
} from "@/services/supabase/types.app";
import { definitions } from "@/services/supabase/types.database";
import * as TMDB from "@/services/tmdb";
import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

// TODO: 1 - recevied and sent are pretty similar - see if can combine
// TODO: 2 - need to group by movie to get suggestion list of friends
export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { friendshipIds, friendIds } = JSON.parse(req.body);
    console.log({ friendshipIds, friendIds });
    // TODO: see if types for relations can be handled differently
    const { data: suggestions, error } = (await supabaseServer
      .from<definitions["suggestions"]>("suggestions")
      .select(
        `id, show_id, user:user_id(username, avatar_url), show_media_type(type)`
      )
      .or(
        `friendship_id.in.(${friendshipIds}), user_id.in.(${friendIds})`
      )) as unknown as {
      data: SuggestionSchemaWithRelations[];
      error: PostgrestError | null;
    };

    // TODO: user_id will refer to the user join from select above. find a way around that match TS
    // user:user_id(username, avatar_url) works but cause TS error - or renmae column user_id to user ?
    const suggestionMapper = async (
      suggestion: SuggestionSchemaWithRelations
    ): Promise<Suggestion> => ({
      id: suggestion.id,
      user: suggestion.user,
      show: await TMDB.getShow(
        suggestion.show_media_type.type,
        suggestion.show_id
      ),
    });

    if (suggestions) {
      const data = await Promise.all(suggestions.map(suggestionMapper));
      return res.status(200).json(data);
    } else {
      // TODO: add unit/int test - need to pass empty array when suggestions is empty !!!
      return res.status(200).json([]);
    }
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
});
