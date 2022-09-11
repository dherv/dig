import { Show } from "@/services/tmdb/types";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { MovieGroup } from "./MovieGroup";
import { NetworkName } from "./NetworkName";

interface Props {
  movies: Show[];
  mediaType: Show["media_type"];
}

export const NetworkMovieGroup: FC<Props> = ({ movies, mediaType }) => {
  return (
    <div>
      <NetworkName />
      <MovieGroup movies={movies} mediaType={mediaType} />
      <ChevronDownIcon className="icon" />
    </div>
  );
};
