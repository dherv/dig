import Image from "next/image";
import { FC } from "react";

type Props = {
  src?: string;
  username?: string;
  size?: number;
  className?: string;
};

export const Avatar: FC<Props> = ({ src, username, size = 16 }) => {
  const className = `w-[${size}px] h-[${size}px]`;
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={`${size}px`}
        width={`${size}px`}
      />
    );
  }

  if (username) {
    return (
      <div
        className={`bg-slate-200 flex items-center justify-center rounded-full ${className} p-6 font-semibold uppercase`}
      >
        {username.slice(0, 2)}
      </div>
    );
  }

  return (
    <div
      className={`bg-slate-200 flex items-center justify-center rounded-full ${className} p-6 font-semibold uppercase`}
    >
      ?
    </div>
  );
};
