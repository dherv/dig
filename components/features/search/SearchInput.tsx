import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { ChangeEvent, FC, useEffect, useRef } from "react";

type Props = {
  value?: string;
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
      <div className="visible md:invisible">
        <SearchIcon className="h-5 w-5" onClick={openMobileSearch} />
        <label
          className={`flex ${status} md:hidden absolute top-0 bottom-0 left-0 right-0 bg-gray-700 z-20`}
        >
          <input
            ref={ref}
            type="text"
            className="h-full w-full px-2 text-white bg-gray-700"
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

      <input
        type="text"
        placeholder="search"
        value={value}
        onChange={onChange}
        className="hidden md:block bg-transparent border text-sm border-gray-400 placeholder-gray-400 placeholder-sm py-1 px-4 rounded-full"
      />
    </>
  );
};
