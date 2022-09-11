import { FC } from "react";
import { Avatar } from "./Avatar";

type Props = {
  src?: string;
  username?: string;
  size: number;
};

export const User: FC<Props> = (props) => {
  return (
    <div className="flex items-center">
      <Avatar {...props} />
      <span className="ml-4 font-medium">{props.username}</span>
    </div>
  );
};
