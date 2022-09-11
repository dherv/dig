import { FC } from "react";
import { Movie } from "../../services/tmdb/types";
import { MovieCard } from "./MovieCard";

interface Props {
  data: any;
}

export const MovieGroup: FC<Props> = ({ data }) => {
  const movies = data.results;

  return (
    <ul className="flex -ml-2 -mr-2 my-2 overflow-scroll">
      {movies.map((movie: Movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};
