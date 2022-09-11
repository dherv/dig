import * as SWR from "../swr";
import { MediaType, Show } from "./types";
import * as TMDB from "./url";

export const searchMovieService = async (query: string) => {
  const url = TMDB.url("/search/multi", { query });
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};

export const getShow = async (
  type: string,
  showId?: number | string | string[]
): Promise<Show> => {
  const url = TMDB.url(`/${type}/${showId}`);
  const data = (await SWR.fetcher(url)) as unknown as Show;
  const show = { ...data, media_type: type as MediaType };
  return show;
};
