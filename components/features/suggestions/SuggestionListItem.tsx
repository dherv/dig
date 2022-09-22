import { Suggestion } from "@/services/supabase/types.app";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { MediaType, Show } from "services/tmdb/types";
import { User } from "../../layout/User";
import { MovieTitle } from "../movie/MovieCardTitle";

interface Props {
  suggestion: Suggestion;
  movie: Show;
  mediaType: MediaType;
  withAvatar: boolean;
}

export const SuggestionListItem: FC<Props> = ({
  suggestion,
  movie,
  mediaType,
  withAvatar,
}) => {
  const router = useRouter();

  const handleClickShow = (showId: number, mediaType: MediaType) => {
    router.push(`/shows/${showId}?mediaType=${mediaType}`);
  };

  const poster = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;

  return (
    <li className="mr-2 rounded-md w-full my-4 p-2 shadow-md">
      <div
        className="relative flex w-full cursor-pointer rounded-md "
        onClick={() => handleClickShow(movie.id, mediaType)}
      >
        <div className="relative shadow-lg md:w-[90px] md:h-[130px] w-10 h-14">
          <Image
            src={poster}
            alt="backdrop of the movie or serie"
            layout="responsive"
            width={200}
            height={300}
            className="rounded"
          />
        </div>
        <div className="flex flex-col justify-center ml-4">
          <MovieTitle title={movie.title}></MovieTitle>
          <p className="font-thin">{movie.release_date}</p>
        </div>
        {withAvatar ? (
          <div className="absolute top-0 right-0">
            <User
              src={suggestion.user?.avatar_url}
              username={suggestion.user?.username}
              size={"md"}
              avatarType="avatar"

              // username={suggestion.user?.username}
              // className="w-[20px] h-[20px]"
            />
          </div>
        ) : null}
        {/* TODO: add AvatarGroup */}
      </div>
    </li>
  );
};
