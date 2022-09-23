// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorService } from "../../../services/error";
import * as TMDB from "../../../services/tmdb";
type Data = {
  name: string;
};

export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const query = req.query;
    if (typeof query.title === "string") {
      const data = await TMDB.searchMovieService(query.title);
      return res.status(200).json(data);
    } else {
      throw new Error("query title should be a string");
    }
  } catch (error) {
    return ErrorService.apiError(error, res);
  }
});
