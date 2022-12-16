import { FC, ReactElement } from "react";

export const AutocompleteDropdown: FC<{
  children: ReactElement;
  searchQuery?: string;
}> = ({ children, searchQuery }) => {
  const height = searchQuery ? "md:h-[56.5rem]" : "h-[0px]";
  const opacity = searchQuery ? "opacity-1" : "opacity-0";
  return (
    <ul
      className={`transition-all ${opacity}	absolute top-16 md:top-10 left-0 z-10 rounded-md bg-slate-900 shadow-lg text-white overflow-y-scroll ${height} w-full shadow-sm`}
    >
      {children}
    </ul>
  );
};
