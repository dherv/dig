import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useRef } from "react";
import { MediaType, Show } from "services/tmdb/types";
import { MovieTitle } from "./MovieTitle";

interface Props {
  movie: Show;
  mediaType: MediaType;
}

export const MovieCard: FC<Props> = ({ movie, mediaType }) => {
  const router = useRouter();
  const ref = useRef<any | HTMLLIElement>(null);

  const handleClickShow = (showId: number, mediaType: MediaType) => {
    router.push(`/shows/${showId}?mediaType=${mediaType}`);
  };

  const backdrop = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  // TODO: fix the confusion between mediaType and type
  // TODO: make the styles more generic to reuse the card
  return (
    <li
      ref={ref}
      className="inline-block cursor-pointer hover:scale-105 transition-transform mr-5 w-[calc(25%_-_1rem)] overflow-visible"
      onClick={() => handleClickShow(movie.id, mediaType)}
    >
      <div className="shadow-lg">
        <Image
          src={backdrop}
          alt="backdrop of the movie or serie"
          layout="responsive"
          width={"16%"}
          height={"9%"}
          className="rounded"
        />
      </div>

      <>
        <MovieTitle
          title={movie.original_title}
          vote={movie.vote_average}
          release_date={movie.release_date}
        />
      </>
    </li>
  );
};
