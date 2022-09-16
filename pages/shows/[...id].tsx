import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Rank } from "../../components/features/movie/Rank";
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

  const rank = data.vote_average.toFixed(1);
  return data ? (
    <article className="relative my-4 mx-auto max-w-[1280px]">
      <div className="flex py-4">
        <div>
          <h2 className="font-medium text-3xl">
            {type === MediaType.Movie
              ? data.original_title
              : data.original_name}
          </h2>
          <div className="flex items-end leading-4 my-2">
            <span className="font-thin">{data.release_date}</span>
            <span className="font-thin">.</span>
            <span className="font-thin">{data.runtime}</span>
            <div className="flex items-end ml-4">
              <Rank size={20} vote={data.vote_average} />
              <p className="font-bold ml-2">{rank}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-4">
        <div className="relative w-3/4 h-[540px] max-h-[540px] ">
          <Image
            src={TMDB.posterPath(data.backdrop_path, { size: "w1280" })}
            alt="backdrop of the movie or serie"
            layout="fill"
            objectFit="cover"
            objectPosition={"top 0 left 0"}
          />

          {/* <div className="w-full px-[6%] bg-black h-[300px] my-4">
        <ReactPlayer
          light={TMDB.posterPath(data.backdrop_path, { size: "w1280" })}
          width="100%"
          height="100%"
          onClickPreview={() => console.log("click preview")}
          url={`https://www.youtube.com/watch?v=${data.videos.results[0]?.key}`}
        />
      </div> */}
        </div>
        <div className="w-1/4 h-[540px] max-h-[540px] bg-gray-700 "></div>
      </div>
      <div className="relative flex my-6 justify-between">
        {/* <div className="mr-1 w-1/4 relative">
          <Image
            src={TMDB.posterPath(data.poster_path, { size: "w780" })}
            alt="backdrop of the movie or serie"
            width={"280"}
            height={"420"}
            layout="responsive"
          />
        </div> */}
        <div className="">
          <div>
            <div className="">
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
        </div>
        <div>
          <button
            onClick={handleSuggest}
            className="block w-48 mb-2 px-12 py-3 text-sm font-medium text-white bg-gray-600 border border-gray-600 rounded active:text-gray-500 hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring"
          >
            watch trailer
          </button>
          <button
            onClick={handleSuggest}
            disabled={isAlreadySuggested}
            className="block w-48 px-12 py-3 text-sm font-medium text-white bg-pink-600 border border-pink-600 rounded active:text-pink-500 hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring"
          >
            {isAlreadySuggested ? "already did it!" : "suggest it!"}
          </button>
        </div>
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
