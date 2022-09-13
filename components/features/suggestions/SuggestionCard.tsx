import { Spacer } from "@/layout/Spacer";
import { User } from "@/layout/User";
import { Suggestion } from "@/services/supabase/types.app";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { MediaType, Show } from "services/tmdb/types";
import { MovieTitle } from "../movie/MovieTitle";

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

  const poster = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  return (
    <li
      className="mx-2 p-6 border border-gray-400 min-w-fit cursor-pointer shadow-md hover:shadow-xl transition-shadow"
      onClick={() => handleClickShow(movie.id, mediaType)}
    >
      <User
        src={suggestion.user?.avatar_url}
        username={suggestion.user?.username}
        size={40}
      />
      <Spacer size={4} />
      <Image
        src={poster}
        alt="poster of the movie or serie"
        width={533}
        height={300}
      />
      <MovieTitle title={movie.original_title} vote={movie.vote_average} />
    </li>
  );
};
