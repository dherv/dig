import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { MediaType } from "services/tmdb/types";

interface Props {
  movie: any;
}
export const MovieCard: FC<Props> = ({ movie }) => {
  const router = useRouter();
  const handleClickShow = (showId: number, mediaType: MediaType) => {
    router.push(`/shows/${showId}?mediaType=${mediaType}`);
  };

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  // TODO: fix the confusion between mediaType and type
  return (
    <li
      className="mx-2 min-w-fit cursor-pointer"
      onClick={() => handleClickShow(movie.id, movie.mediaType ?? movie.type)}
    >
      <Image
        src={poster}
        alt="poster of the movie or serie"
        width={100}
        height={150}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <p>{movie.release_date}</p>
    </li>
  );
};
