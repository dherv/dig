import Image from "next/image";
import { FC } from "react";

type Props = {
  src?: string;
  username?: string;
  size: number;
};

export const Avatar: FC<Props> = ({ src, username, size }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="avatar image"
        height={size}
        width={size}
      />
    );
  }

  if (username) {
    return (
      <div className="bg-slate-200 flex items-center justify-center rounded-3xl transition group shrink-0 w-4 h-4 p-6 font-semibold uppercase">
        {username.slice(0, 2)}
      </div>
    );
  }

  return (
    <div className="bg-slate-200 flex items-center justify-center rounded-3xl transition group shrink-0 w-4 h-4 p-6 font-semibold uppercase">
      ?
    </div>
  );
};
