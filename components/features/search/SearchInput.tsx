import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { ChangeEvent, FC, useEffect, useRef } from "react";

type Props = {
  value: string;
  isSearchMobileOpen: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  openMobileSearch: () => void;
  closeSearch: () => void;
};

export const SearchInput: FC<Props> = ({
  value,
  onChange,
  isSearchMobileOpen,
  openMobileSearch,
  closeSearch,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const status = isSearchMobileOpen ? "block" : "hidden";

  useEffect(() => {
    if (isSearchMobileOpen && ref.current) {
      ref.current.focus();
    }
  }, [isSearchMobileOpen]);

  return (
    <>
      <div className=" md:hidden">
        <SearchIcon className="h-5 w-5" onClick={openMobileSearch} />
        <label
          htmlFor="autocomplete-mobile"
          className={`flex ${status} md:hidden absolute top-0 bottom-0 left-0 right-0 bg-gray-700 z-20`}
        >
          <input
            id="autocomplete-mobile"
            ref={ref}
            type="text"
            className="h-full w-full px-2 text-white bg-gray-700 focus:outline-none outline-none"
            value={value}
            onChange={onChange}
          />
          <div
            className="flex w-[48px] justify-center items-center"
            onClick={closeSearch}
          >
            <XIcon className="h-5 w-5 text-white" />
          </div>
        </label>
      </div>

      <label htmlFor="autocomplete-desktop" className="relative ">
        <SearchIcon className="h-5 w-5 absolute top-2 right-3" />

        <input
          id="autocomplete-desktop"
          type="text"
          placeholder="search"
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="px-3 py-2 w-full hidden md:block bg-gray-700 text-sm rounded placeholder-gray-400 placeholder-sm focus:outline-none outline-none shadow-md"
        />
      </label>
    </>
  );
};
