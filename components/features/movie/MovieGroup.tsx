import { MovieCard } from "@/features/movie/MovieCard";
import { MediaType, Show } from "@/services/tmdb/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  movies: Show[];
  mediaType: MediaType;
}

export const MovieGroup: FC<Props> = ({ movies, mediaType }) => {
  const [currentRow, setCurrentRow] = useState<number>(0);
  const maxSlides = useRef<number | null>(null);
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    maxSlides.current = Math.floor(movies.length / 4);
  }, [movies]);

  const handleNext = () => {
    if (maxSlides.current && currentRow <= maxSlides.current) {
      setCurrentRow((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (maxSlides.current && currentRow <= maxSlides.current) {
      setCurrentRow((prev) => prev - 1);
    }
  };

  useEffect(() => {
    // slice to 5 * current + 1
    if (ref && ref.current && maxSlides && maxSlides.current) {
      if (currentRow === 0 && ref.current?.scrollLeft > 0) {
        ref.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
      if (currentRow > 0 && currentRow < maxSlides.current) {
        console.log("here");

        const child = Array.from(ref.current.children)[4 * currentRow];
        console.log(child);
        ref.current.scrollTo({
          top: 0,
          // offset of the first element of next group + section padding (16px) + wrapper padding (8px)
          left: child.offsetLeft - 8,
          behavior: "smooth",
        });
      }

      if (currentRow > maxSlides.current) {
        ref.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setCurrentRow(0);
      }
    }
  }, [currentRow]);

  return (
    <div className="relative pr-[6%]">
      <ul
        ref={ref}
        className={`pt-2 mb-10 whitespace-nowrap w-full overflow-hidden`}
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} mediaType={mediaType} />
        ))}
      </ul>

      <div className="absolute top-1/3 right-10 flex items-center  bg-black bg-opacity-70">
        {currentRow > 0 ? (
          <button className={` w-10 h-10`} onClick={handlePrev}>
            <ChevronLeftIcon className=" text-white opacity-100" />
          </button>
        ) : null}
        <button className={` w-10 h-10`} onClick={handleNext}>
          <ChevronRightIcon className=" text-white opacity-100" />
        </button>
      </div>
    </div>
  );
};
