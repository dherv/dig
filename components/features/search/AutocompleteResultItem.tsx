import * as TMDB from "@/services/tmdb";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { MediaType, Show } from "../../../services/tmdb/types";

export const AutocompleteResultItem: FC<{
  renderResultItem?: (show: Show) => ReactElement;
  show: Show;
  onSelect: (media_type: MediaType, showId: number) => void;
}> = (props) => {
  const { renderResultItem, ...rest } = props;
  const { show, onSelect } = rest;

  return (
    <li
      key={show.id}
      className="p-4 flex border-b border-b-gray-400 cursor-pointer hover:bg-gray-600"
      onClick={() => onSelect(show.media_type, show.id)}
    >
      {renderResultItem ? (
        renderResultItem(show)
      ) : (
        <>
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
          </h5>{" "}
        </>
      )}
    </li>
  );
};
