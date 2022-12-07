import { MediaType, Show } from "@/services/tmdb/types";
import { useClickOutside, useDebounce } from "@react-hooks-library/core";
import { ChangeEvent, FC, ReactElement, useRef, useState } from "react";
import useSWR from "swr";
import { AutocompleteResultItem } from "./AutocompleteResultItem";
import { SearchInput } from "./SearchInput";

type Props = {
  resultCount: number;
  onChange?: () => void;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSelect: (mediaType: MediaType, showId: number) => void;
  render?: (data: unknown) => void;
  renderResultItem?: (show: Show) => ReactElement;
};

export const Autocomplete: FC<Props> = ({
  resultCount,
  onSelect,
  renderResultItem,
}) => {
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
    onSelect(mediaType, showId);
  };

  const openMobileSearch = () => {
    setSearchMobileOpen(true);
  };

  return (
    <div className="md:relative" ref={ref}>
      <SearchInput
        value={searchQuery ?? ""}
        onChange={handleChange}
        openMobileSearch={openMobileSearch}
        closeSearch={closeSearch}
        isSearchMobileOpen={isSearchMobileOpen}
      />
      {searchQuery && (
        <ul className="absolute top-16 md:top-12 left-0 z-10 bg-gray-700 text-white  overflow-y-scroll h-[calc(100vh_-_64px)] md:h-[56.5rem] w-full md:w-[32rem] md:left-1/2 md:-translate-x-1/2 shadow-sm">
          {shows ? (
            shows?.map((show: Show) => (
              <AutocompleteResultItem
                key={show.id}
                show={show}
                renderResultItem={renderResultItem}
                onSelect={handleClickShow}
              />
            ))
          ) : (
            <div className="flex justify-center p-4 border-b h-[80px]">
              {/* TODO: add loader */}
              {/* <Loading type="points" color="currentColor" /> */}
            </div>
          )}
        </ul>
      )}
    </div>
  );
};
