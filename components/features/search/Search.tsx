import * as TMDB from "@/services/tmdb";
import { MediaType, Show } from "@/services/tmdb/types";
import { Loading } from "@nextui-org/react";
import { useClickOutside, useDebounce } from "@react-hooks-library/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useRef, useState } from "react";
import useSWR from "swr";
import { SearchInput } from "./SearchInput";
export const Search: FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>();
  const [isSearchMobileOpen, setSearchMobileOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 1000);
  const ref = useRef(null);

  const closeSearch = () => {
    setSearchMobileOpen(false);
    setSearchQuery("");
  };

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

  const openMobileSearch = () => {
    setSearchMobileOpen(true);
  };

  return (
    <div className="md:relative" ref={ref}>
      <SearchInput
        value={searchQuery}
        onChange={handleChange}
        openMobileSearch={openMobileSearch}
        closeSearch={closeSearch}
        isSearchMobileOpen={isSearchMobileOpen}
      />
      {searchQuery && (
        <ul className="absolute top-16 md:top-12 left-0 z-10 bg-gray-700 text-white  overflow-y-scroll h-[calc(100vh_-_64px)] md:h-[56.5rem] w-full md:w-[32rem] md:left-1/2 md:-translate-x-1/2 shadow-sm">
          {shows ? (
            shows?.map((show: Show) => (
              <li
                key={show.id}
                className="p-4 flex border-b border-b-gray-400 cursor-pointer hover:bg-gray-600"
                onClick={() => handleClickShow(show.media_type, show.id)}
              >
                <div className="relative">
                  <Image
                    src={TMDB.posterPath(show.poster_path)}
                    alt="poster of the movie or serie"
                    width={"55"}
                    height={"80"}
                  />
                </div>

                <h5 className="font-medium ml-2 cusr">
                  {show.media_type === MediaType.TV
                    ? show.original_name
                    : show.original_title}
                </h5>
              </li>
            ))
          ) : (
            <div className="flex justify-center p-4 border-b h-[80px]">
              <Loading type="points" color="currentColor" />
            </div>
          )}
        </ul>
      )}
    </div>
  );
};
