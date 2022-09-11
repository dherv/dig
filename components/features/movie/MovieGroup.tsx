import { MediaType, Show } from "@/services/tmdb/types";
import { FC } from "react";
import { MovieCard } from "./MovieCard";

interface Props {
  movies: Show[];
  mediaType: MediaType;
}

export const MovieGroup: FC<Props> = ({ movies, mediaType }) => {
  console.log({ movies });
  return (
    <ul className="flex -ml-2 -mr-2 my-2 overflow-scroll">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} mediaType={mediaType} />
      ))}
    </ul>
  );
};
