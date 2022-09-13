import { FC } from "react";

type Props = {
  title: string;
  vote: number;
};
export const MovieTitle: FC<Props> = ({ title, vote }) => {
  return (
    <div className="flex justify-between items-center">
      <h4 className="font-medium text-lg mt-2">{title}</h4>
      <span className="font-medium text-lg mt-2">{Math.round(vote * 10)}</span>
    </div>
  );
};
