import { FC } from "react";
import { MovieCard } from "./MovieCard";

interface Props {
  data: any;
}

export const MovieGroup: FC<Props> = ({ data }) => {
  const movies = data.results;

  return (
    <ul className="flex -ml-2 -mr-2 my-2 overflow-scroll">
      {movies.map((movie: any) => (
        <li key={movie.id} className="mx-2 min-w-fit">
          <MovieCard movie={movie} key={movie.id} />
        </li>
      ))}
    </ul>
  );
};
