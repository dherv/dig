import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useRef } from "react";
import { MediaType, Show } from "services/tmdb/types";

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

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://dummyimage.com/200x300/efefef/212121.jpg&text=${movie.title}`;

  // TODO: fix the confusion between mediaType and type
  // TODO: make the styles more generic to reuse the card
  return (
    <li
      ref={ref}
      className="inline-block md:rounded h-full w-[calc(33%_-_24px)] sm:w-[calc(25%_-_24px)] md:w-[calc(20%_-_24px)] lg:w-[calc(20%_-_24px)] cursor-pointer hover:scale-105 transition-transform mr-4 md:mr-2 "
      onClick={() => handleClickShow(movie.id, mediaType)}
    >
      <div className="relative shadow-lg h-full md:rounded">
        <Image
          src={poster}
          alt="backdrop of the movie or serie"
          layout="responsive"
          width={200}
          height={300}
          className="md:rounded"
        />
      </div>

      {/* <MovieCardTitle
        title={movie.original_title}
        vote={movie.vote_average}
        release_date={movie.release_date}
      /> */}
    </li>
  );
};
