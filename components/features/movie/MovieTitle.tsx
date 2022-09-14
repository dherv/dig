import { format } from "date-fns";
import { FC } from "react";
import { Rank1on5 } from "./Rank1on5";
import { Rank3on5 } from "./Rank3on5";
import { Rank4on5 } from "./Rank4on5";
import { Rank5on5 } from "./Rank5on5";

type Props = {
  title: string;
  vote: number;
  release_date: string;
};

export const MovieTitle: FC<Props> = ({ title, vote, release_date }) => {
  const getRatingComponent = () => {
    if (vote > 8) return <Rank5on5 />;
    if (vote > 7 && vote <= 8) return <Rank4on5 />;
    if (vote > 6 && vote <= 7) return <Rank3on5 />;
    if (vote > 4 && vote <= 6) return <Rank3on5 />;
    if (vote > 2 && vote <= 4) return <Rank1on5 />;
    if (vote > 0 && vote <= 2) return <Rank1on5 />;
  };

  const Component = getRatingComponent();

  return (
    <div className="flex justify-between items-end">
      <div className="max-w-[80%]">
        <h4 className="font-bold leading-6 text-sm mt-2 text-ellipsis overflow-hidden">
          {title}
        </h4>
        <p className="font-light leading-6 text-sm">
          {format(new Date(release_date), "EEE, MMM dd")}
        </p>
      </div>

      <div className="flex flex-col items-center">
        {Component}
        <p className="font-light leading-6 text-xs mr-[1px]">
          {vote.toFixed(1)}
        </p>
      </div>
    </div>
  );
};
