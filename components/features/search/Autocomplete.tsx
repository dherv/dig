import { MediaType, Show } from "@/services/tmdb/types";
import { useClickOutside, useDebounce } from "@react-hooks-library/core";
import { ChangeEvent, FC, ReactElement, useRef, useState } from "react";
import useSWR from "swr";
import { AutocompleteDropdown } from "./AutocompleteDropdown";
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

  const debouncedSearch = useDebounce(searchQuery, 800);
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
    <div className="md:relative w-96" ref={ref}>
      <SearchInput
        value={searchQuery ?? ""}
        onChange={handleChange}
        openMobileSearch={openMobileSearch}
        closeSearch={closeSearch}
        isSearchMobileOpen={isSearchMobileOpen}
      />
      {/* {searchQuery && ( */}
      <AutocompleteDropdown searchQuery={searchQuery}>
        {shows?.map((show: Show) => (
          <AutocompleteResultItem
            key={show.id}
            show={show}
            renderResultItem={renderResultItem}
            onSelect={handleClickShow}
          />
        ))}
      </AutocompleteDropdown>
      {/* )} */}
    </div>
  );
};
