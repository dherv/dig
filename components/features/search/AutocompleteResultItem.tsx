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

  console.log({ show });
  return (
    <li
      key={show.id}
      className="p-2 flex border-b border-b-slate-600 cursor-pointer hover:bg-gray-600"
      onClick={() => onSelect(show.media_type, show.id)}
    >
      {renderResultItem ? (
        renderResultItem(show)
      ) : (
        <>
          <div className="relative w-1/6">
            <Image
              src={TMDB.posterPath(show.poster_path)}
              alt="poster of the movie or serie"
              layout="responsive"
              width={500}
              height={719}
            />
          </div>
          <div className="ml-2">
            <h5 className="font-bold text-sm">
              {show.media_type === MediaType.TV
                ? show.original_name
                : show.original_title}
            </h5>
            <p className="text-gray-500 text-xs font-medium">
              {show.media_type === MediaType.Movie
                ? show.release_date
                : show.last_air_date ?? show.first_air_date}
            </p>
          </div>
        </>
      )}
    </li>
  );
};
