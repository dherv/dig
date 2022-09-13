import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { MediaType, Show } from "services/tmdb/types";
import { MovieTitle } from "./MovieTitle";

interface Props {
  movie: Show;
  mediaType: MediaType;
}

export const MovieCard: FC<Props> = ({ movie, mediaType }) => {
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const ref = useRef<any | HTMLLIElement>(null);
  const modalRef = useRef<any | null>(null);

  const handleClickShow = (showId: number, mediaType: MediaType) => {
    router.push(`/shows/${showId}?mediaType=${mediaType}`);
  };

  const backdrop = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleMouseEnter = () => {
    setFocus(true);
  };
  const handleMouseLeave = () => {
    setFocus(false);
  };

  useEffect(() => {
    if (focus && ref.current && modalRef.current) {
      const { top, bottom, right, left } = ref.current.getBoundingClientRect();
      modalRef.current.style.position = "absolute";
      modalRef.current.style.display = "block";
      modalRef.current.style.left = "0" + "px";
      modalRef.current.style.bottom = modalRef.current.offsetHeight * -1 + "px";
      modalRef.current.style.zIndex = 500;
    } else {
      modalRef.current.style.position = "static";
      modalRef.current.style.display = "none";
    }
  }, [focus]);
  // TODO: fix the confusion between mediaType and type
  return (
    <li
      ref={ref}
      className="relative inline-block cursor-pointer hover:scale-105 transition-transform mr-2 w-1/6 shadow-md overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClickShow(movie.id, mediaType)}
    >
      <Image
        src={backdrop}
        alt="backdrop of the movie or serie"
        layout="responsive"
        width={"16%"}
        height={"9%"}
        className="rounded"
      />

      <div ref={modalRef} className="bg-slate-700 p-6 z-500">
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
    </li>
  );
};
