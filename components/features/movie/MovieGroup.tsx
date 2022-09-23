import { MovieCard } from "@/features/movie/MovieCard";
import { MediaType, Show } from "@/services/tmdb/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  movies: Show[];
  mediaType: MediaType;
  title: string;
}

export const MovieGroup: FC<Props> = ({ movies, mediaType, title }) => {
  const [currentRow, setCurrentRow] = useState<number>(0);
  const maxSlides = useRef<number | null>(null);
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    maxSlides.current = Math.floor(movies.length / 5);
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

        const child = Array.from(ref.current.children)[
          5 * currentRow
        ] as HTMLElement;

        ref.current.scrollTo({
          top: 0,
          // offset of the first element of next group + section padding (16px) + wrapper padding (8px)
          left: child.offsetLeft,
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
    <div className="relative">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-md leading-10">{title}</h2>
        <div className="hidden md:flex items-center">
          {currentRow > 0 ? (
            <button className={`w-7 h-7 ml-2`} onClick={handlePrev}>
              <ChevronLeftIcon className=" text-gray-400 border-gray-400 hover:text-gray-700 hover:border-gray-700 transition-all border rounded-full" />
            </button>
          ) : null}
          <button className={`w-7 h-7 ml-2`} onClick={handleNext}>
            <ChevronRightIcon className=" text-gray-400 border-gray-400 hover:text-gray-700 hover:border-gray-700 transition-all border rounded-full" />
          </button>
        </div>
      </div>

      <ul
        ref={ref}
        className={`mb-10 py-4  whitespace-nowrap w-full overflow-x-scroll overflow-y-hidden md:overflow-x-hidden`}
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} mediaType={mediaType} />
        ))}
      </ul>
    </div>
  );
};
