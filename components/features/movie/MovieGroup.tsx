import { MovieCard } from "@/features/movie/MovieCard";
import { MediaType, Show } from "@/services/tmdb/types";
import { FC } from "react";

interface Props {
  movies: Show[];
  mediaType: MediaType;
  count: number;
}

export const MovieGroup: FC<Props> = ({ movies, mediaType, count }) => {
  console.log({ movies });
  return (
    <ul
      className={`pr-[6%] pb-10 overflow-visible whitespace-nowrap w-full z-${count}`}
    >
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} mediaType={mediaType} />
      ))}
      <button className="fixed right-0">next</button>
    </ul>
  );
};
