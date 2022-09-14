import { MovieCard } from "@/features/movie/MovieCard";
import { MediaType, Show } from "@/services/tmdb/types";
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
    console.log(maxSlides.current);
    if (maxSlides.current && currentRow <= maxSlides.current) {
      setCurrentRow((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    console.log(maxSlides.current);
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
          left: child.offsetLeft - 24,
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
    <>
      <p>{currentRow}</p>
      {currentRow > 0 ? (
        <button className="fixed right-0" onClick={handlePrev}>
          prev
        </button>
      ) : null}
      <ul
        ref={ref}
        className={`pr-[6%] pt-2 pb-10 whitespace-nowrap w-full overflow-hidden`}
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} mediaType={mediaType} />
        ))}
      </ul>
      <button className="fixed right-0" onClick={handleNext}>
        next
      </button>
    </>
  );
};
