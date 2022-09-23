import { ReactElement } from "react";
import { Rank1on5 } from "./Rank1on5";
import { Rank2on5 } from "./Rank2on5";
import { Rank3on5 } from "./Rank3on5";
import { Rank4on5 } from "./Rank4on5";
import { Rank5on5 } from "./Rank5on5";

export const Rank = ({ size = 24, vote }: { size: number; vote: number }) => {
  const getRatingComponent = (vote: number) => {
    if (vote > 8) return 5;
    if (vote > 7 && vote <= 8) return 4;
    if (vote > 6 && vote <= 7) return 3;
    if (vote > 4 && vote <= 6) return 3;
    if (vote > 2 && vote <= 4) return 2;
    if (vote > 0 && vote <= 2) return 1;
    return 0;
  };

  const rank = getRatingComponent(vote);

  const mapper: {
    [key: number]: ({ size }: { size: number }) => ReactElement;
  } = {
    1: Rank1on5,
    2: Rank2on5,
    3: Rank3on5,
    4: Rank4on5,
    5: Rank5on5,
  };

  if (rank > 0 && rank <= 5) {
    const Component = mapper[rank];
    return <Component size={size} />;
  }

  return null;
};
