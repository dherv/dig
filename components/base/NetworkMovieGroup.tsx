import { ChevronDownIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { MovieGroup } from "./MovieGroup";
import { NetworkName } from "./NetworkName";

interface Props {
  data: any;
}

export const NetworkMovieGroup: FC<Props> = ({ data }) => {
  return (
    <div>
      <NetworkName />
      <MovieGroup data={data} />
      <ChevronDownIcon className="icon" />
    </div>
  );
};
