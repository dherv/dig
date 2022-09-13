import Image from "next/image";
import { ForwardedRef, forwardRef } from "react";
import { Movie } from "../../../services/tmdb/types";
import { MovieTitle } from "./MovieTitle";

export const MovieCardModalComponent = (
  { movie, position }: { postion?: any; movie: Movie },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div ref={ref} className=" bg-slate-700 p-6 z-100">
      <Image
        layout="fixed"
        width={100}
        height={200}
        src={poster}
        alt="poster of the movie or serie"
      ></Image>
      <p>{movie.release_date}</p>
      <MovieTitle title={movie.original_title} vote={movie.vote_average} />
    </div>
  );
};

export const MovieCardModal = forwardRef(MovieCardModalComponent);
