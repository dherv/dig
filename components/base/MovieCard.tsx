import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  movie: any;
}
export const MovieCard: FC<Props> = ({ movie }) => {
  const router = useRouter();
  const handleClickShow = (showId: number) => {
    router.push(`/shows/${showId}?mediaType=movie`);
  };

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <li
      className="mx-2 min-w-fit cursor-pointer"
      onClick={() => handleClickShow(movie.id)}
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
