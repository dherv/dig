import { useRouter } from "next/router";
import { FC } from "react";
import { Movie } from "../../services/tmdb/types";
import { MovieCard } from "./MovieCard";

interface Props {
  data: any;
}

export const MovieGroup: FC<Props> = ({ data }) => {
  const router = useRouter();
  const movies = data.results;

  const handleClickShow = (showId: number) => {
    router.push(`/shows/${showId}?mediaType=movie`);
  };
  return (
    <ul className="flex -ml-2 -mr-2 my-2 overflow-scroll">
      {movies.map((movie: Movie) => (
        <li
          key={movie.id}
          className="mx-2 min-w-fit cursor-pointer"
          onClick={() => handleClickShow(movie.id)}
        >
          <MovieCard movie={movie} key={movie.id} />
        </li>
      ))}
    </ul>
  );
};
