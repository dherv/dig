import { Suggestion } from "@/services/supabase/types.app";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { MediaType, Show } from "services/tmdb/types";
import { User } from "../../layout/User";

interface Props {
  suggestion: Suggestion;
  movie: Show;
  mediaType: MediaType;
}

export const SuggestionCard: FC<Props> = ({ suggestion, movie, mediaType }) => {
  const router = useRouter();

  const handleClickShow = (showId: number, mediaType: MediaType) => {
    router.push(`/shows/${showId}?mediaType=${mediaType}`);
  };

  const poster = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

  return (
    <li className="relative mr-2 rounded-md w-full shadow-lg">
      <div
        className=" cursor-pointer rounded-md"
        onClick={() => handleClickShow(movie.id, mediaType)}
      >
        <div className="relative">
          <Image
            src={poster}
            alt="backdrop of the movie or serie"
            layout="responsive"
            width={960}
            height={540}
            objectPosition={"top 0 left 0"}
            className="rounded-md"
          />
        </div>
        <div className="absolute bottom-0 right-0 p-1 border-r-0 border-4 border-white bg-gray-700 bg-opacity-90 z-10 rounded-br-md rounded-l-full">
          <User
            src={suggestion.user?.avatar_url}
            className={"w-[16px] h-[16px]"}
            avatarType="avatar"
          />
        </div>
      </div>
    </li>
  );
};
