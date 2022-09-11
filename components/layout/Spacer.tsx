import { FC } from "react";

type Props = {
  size: number;
};

export const Spacer: FC<Props> = ({ size }) => {
  return <div className={`h-${size}`}></div>;
};
