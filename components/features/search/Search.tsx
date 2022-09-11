import { useClickOutside, useDebounce } from "@react-hooks-library/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useRef, useState } from "react";
import useSWR from "swr";
import * as TMDB from "../../services/tmdb";
import { MediaType, Show } from "../../services/tmdb/types";

export const Search: FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>();
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const ref = useRef(null);

  const closeSearch = () => setSearchQuery("");

  useClickOutside(ref, () => {
    closeSearch();
  });

  const { data: shows } = useSWR(
    debouncedSearch ? `/api/shows/search?title=${debouncedSearch}` : null
  );

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClickShow = (mediaType: MediaType, showId: number) => {
    closeSearch();
    router.push(`/shows/${showId}?mediaType=${mediaType}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="search movie..."
        value={searchQuery}
        onChange={handleChange}
      />
      {searchQuery && (
        <ul
          ref={ref}
          className="absolute z-10 border mt-2 bg-white overflow-y-scroll h-[64rem] w-[32rem] left-1/2 -translate-x-1/2 shadow-sm"
        >
          {shows?.map((show: Show) => (
            <li
              key={show.id}
              className="p-4 flex border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleClickShow(show.media_type, show.id)}
            >
              <Image
                src={TMDB.posterPath(show.poster_path)}
                alt="poster of the movie or serie"
                width={60}
                height={80}
              />
              <h5 className="font-medium ml-2 cusr">
                {show.media_type === MediaType.TV
                  ? show.original_name
                  : show.original_title}
              </h5>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
