import { Suggestion } from "@/services/supabase/types.app";
import * as TMDB from "@/services/tmdb";
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

  const runtime = TMDB.getRuntime(movie, mediaType, TMDB.formatRuntime);
  const releaseDate = TMDB.getReleaseDate(movie, mediaType);

  return (
    <li className="mr-2 rounded-md w-full my-4 bg-slate-700 shadow-md">
      <div
        className="flex w-full cursor-pointer rounded-md"
        onClick={() => handleClickShow(movie.id, mediaType)}
      >
        <div className="relative shadow-lg min-w-[40px] h-auto">
          <Image
            src={poster}
            alt="backdrop of the movie or serie"
            layout="responsive"
            width={200}
            height={300}
            className="rounded-l"
          />
        </div>
        <div className="relative flex px-4 py-1 w-full items-center justify-between">
          <div>
            <MovieTitle
              title={mediaType === MediaType.Movie ? movie.title : movie.name}
            ></MovieTitle>
            <div className="font-thin text-xs">
              {mediaType === MediaType.Movie ? (
                releaseDate
              ) : (
                <>
                  <span className="block text-gray-500">
                    most recent season
                  </span>{" "}
                  <span className="block"> {releaseDate}</span>
                </>
              )}
            </div>
          </div>

          {withAvatar ? (
            <div className="">
              <User
                src={suggestion.user?.avatar_url}
                username={suggestion.user?.username}
                size={"sm"}
                avatarType="avatar"

                // username={suggestion.user?.username}
                // className="w-[20px] h-[20px]"
              />
            </div>
          ) : null}
        </div>

        {/* TODO: add AvatarGroup */}
      </div>
    </li>
  );
};
