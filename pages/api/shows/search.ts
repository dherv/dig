// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as TMDB from "../../../services/tmdb";

type Data = {
  name: string;
};

const searchMovieService = async (query: string) => {
  const url = TMDB.url("/search/multi", { query });
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const data = await searchMovieService(query.title);
  return res.status(200).json(data);
}
