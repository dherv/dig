import Image from 'next/image';
import { FC } from 'react';

interface Props {
  movie: any;
}
export const MovieCard: FC<Props> = ({ movie }) => {
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <>
      <Image
        src={poster}
        alt="poster of the movie or serie"
        width={100}
        height={150}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <p>{movie.release_date}</p>
    </>
  );
};
