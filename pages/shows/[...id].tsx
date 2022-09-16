import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ErrorService } from "../../services/error";
import { Friends, Suggestion } from "../../services/supabase/types.app";
import * as TMDB from "../../services/tmdb";
import { MediaType, Show } from "../../services/tmdb/types";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
interface Props {
  user: User;
  data: Show | null;
  type: MediaType;
}
// TODO: consider using styled components with twin.macro to avoid too many <div> wrappers
const MoviePage: NextPage<Props> = ({ user, data, type }) => {
  const { data: friendshipData } = useSWR(`/api/friendship`);

  const { data: suggestionsSent } = useSWR(
    `/api/suggestions/sent?userId=${user.id}`
  ) as { data: Suggestion[] };

  const [friends, setFriends] = useState<Friends[]>([]);

  useEffect(() => {
    if (friendshipData) {
      setFriends(friendshipData.friends);
    }
  }, [friendshipData]);

  const handleSuggest = async () => {
    try {
      const res = await fetch(`/api/suggestions`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          showId: data?.id,
          showMediaType: type,
        }),
      });

      const newSuggestion = await res.json();
    } catch (error) {
      ErrorService.catchError(error);
    }
  };

  // TODO: move to api to check suggestion - especially after pagination of suggestions
  const isAlreadySuggested = suggestionsSent?.some(
    (suggestion) => suggestion.show.id === data?.id
  );

  return data ? (
    <article className="relative my-4 mx-auto max-w-[960px]">
      <h2 className="font-medium text-3xl">
        {type === MediaType.Movie ? data.original_title : data.original_name}
      </h2>
      <div className="relative flex my-4">
        <div className="mr-1 w-1/4 relative">
          <Image
            src={TMDB.posterPath(data.poster_path, { size: "w780" })}
            alt="backdrop of the movie or serie"
            width={"280"}
            height={"420"}
            layout="responsive"
          />
        </div>
        <div className="w-full">
          <ReactPlayer
            light={true}
            width="100%"
            height="100%"
            onClickPreview={() => console.log("click preview")}
            url={`https://www.youtube.com/watch?v=${data.videos.results[0]?.key}`}
          />
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <div className="my-4">
            {data.genres.map((genre) => (
              <strong
                key={genre.id}
                className="mr-2 border text-gray-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide"
              >
                {genre.name}
              </strong>
            ))}
            <p className="max-w-[600px] my-4">{data.overview}</p>
          </div>
        </div>

        <button
          onClick={handleSuggest}
          disabled={isAlreadySuggested}
          className="inline-block px-12 py-3 text-sm font-medium text-white bg-pink-600 border border-pink-600 rounded active:text-pink-500 hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring"
        >
          {isAlreadySuggested ? "already did it!" : "suggest it!"}
        </button>
      </div>
    </article>
  ) : null;
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    try {
      if (
        typeof ctx.query.mediaType === "string" &&
        ctx.params &&
        ctx.params.id
      ) {
        const data = await TMDB.getShow(ctx.query.mediaType, ctx.params.id[0]);
        return { props: { data, type: ctx.query.mediaType } };
      } else {
        throw new Error("error with show page query params");
      }
    } catch (error) {
      ErrorService.catchError(error);
      return { props: { data: null } };
    }
  },
});

export default MoviePage;
