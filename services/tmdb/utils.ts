import { minutesToHours } from "date-fns";
import { MediaType, Show } from "./types";

export const formatRuntime = (runtime: string) => {
  const formattedRuntime = parseInt(runtime);
  return runtime
    ? `${minutesToHours(formattedRuntime)}h${
        formattedRuntime - minutesToHours(formattedRuntime) * 60
      }min`
    : undefined;
};

export const getRuntime = (
  show: Show,
  mediaType: MediaType,
  format: typeof formatRuntime
) => {
  if (mediaType === MediaType.Movie) {
    return format(show?.runtime);
  }

  // TODO: replace by episode when adding episode feature
  return format(show.episode_run_time[0]);
};

export const getReleaseDate = (show: Show, mediaType: MediaType) => {
  if (mediaType === MediaType.Movie) {
    return show.release_date;
  }
  // TODO: replace by show.seasons.at() when ready or add polyfill
  const serieLastSeason = show.seasons[show.seasons.length - 1];
  const serieLastSeasonAirDate = serieLastSeason.air_date;
  return serieLastSeasonAirDate;
};
