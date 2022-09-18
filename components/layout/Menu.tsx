import { MoonIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { FC } from "react";
import { BrandTitle } from "./BrandTitle";

export const Menu: FC = () => {
  return (
    <div className="py-6 px-12 flex flex-col justify-between h-full">
      <div className="">
        <div className="pb-8">
          <BrandTitle />
        </div>
        <div className="">
          <Link href="/">
            <a className="font-light text-sm text-gray-600">home</a>
          </Link>
        </div>
        <div className="">
          <Link href="/movies">
            <a className="font-light text-sm text-gray-600">movies</a>
          </Link>
        </div>
        <div className="">
          <Link href="/profile">
            <a className="font-light text-sm text-gray-600">profile</a>
          </Link>
        </div>
      </div>

      <div>
        <MoonIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
