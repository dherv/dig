import * as SWR from "../swr";
import * as TMDB from "./url";

export const searchMovieService = async (query: string) => {
  const url = TMDB.url("/search/multi", { query });
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};

export const getShow = async (type?: string, showId?: string | string[]) => {
  console.log(type, showId);
  const url = TMDB.url(`/${type}/${showId}`);
  const data = await SWR.fetcher(url);
  return { ...data, type };
};
