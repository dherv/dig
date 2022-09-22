import { useModal } from "@nextui-org/react";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { minutesToHours } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Rank } from "../../components/features/movie/Rank";
import { ShowTrailerModal } from "../../components/features/show/ShowTrailerModal";
import { ErrorService } from "../../services/error";
import { Friends, Suggestion } from "../../services/supabase/types.app";
import * as TMDB from "../../services/tmdb";
import { MediaType, Show } from "../../services/tmdb/types";

interface Props {
  user: User;
  data: Show | null;
  type: MediaType;
}
// TODO: consider using styled components with twin.macro to avoid too many <div> wrappers
const MoviePage: NextPage<Props> = ({ user, data, type }) => {
  const { setVisible, bindings } = useModal();

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

  const rank = data?.vote_average.toFixed(1);
  const runtime = data.runtime
    ? `${minutesToHours(data?.runtime)}h${
        data?.runtime - minutesToHours(data?.runtime) * 60
      }min`
    : "";
  const handleClickTrailer = () => {
    setVisible(true);
  };

  return data ? (
    <article className="relative my-4 mx-auto max-w-[1280px]">
      <div className="flex py-4 px-4 xl:px-0">
        <div>
          <h2 className="font-medium text-3xl">
            {type === MediaType.Movie
              ? data.original_title
              : data.original_name}
          </h2>
          <div className="flex items-end leading-4 my-2 text-sm ">
            <span className="mr-2 font-thin text-gray-500">
              {data.release_date}
            </span>
            <span className="font-thin text-gray-500">.</span>
            <span className="ml-2 font-thin text-gray-500">{runtime}</span>
            <div className="flex items-end ml-4">
              <Rank size={20} vote={data.vote_average} />
              <p className="font-bold ml-2">{rank}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-4">
        <div className="relative w-3/4">
          <Image
            src={TMDB.posterPath(data.backdrop_path, { size: "w1280" })}
            alt="backdrop of the movie or serie"
            layout="responsive"
            width={"16%"}
            height={"9%"}
            objectFit="cover"
            objectPosition={"top 0 left 0"}
          />

          {/* <div className="w-full px-[6%] bg-black h-[300px] my-4">
 
      </div> */}
        </div>
        <div className="w-1/4 bg-gray-700 flex justify-center items-center">
          <span className=" font-medium text-sm md:text-lg inline-block text-center text-white">
            coming soon!
          </span>
        </div>
      </div>
      <div className="relative md:flex my-6 justify-between px-4 xl:px-0">
        {/* <div className="mr-1 w-1/4 relative">
          <Image
            src={TMDB.posterPath(data.poster_path, { size: "w780" })}
            alt="backdrop of the movie or serie"
            width={"280"}
            height={"420"}
            layout="responsive"
          />
        </div> */}
        <div className="my-2 md:mr-2">
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
              <p className="max-w-[600px] my-4 mx-1 md:mx-0">{data.overview}</p>
            </div>
          </div>
        </div>
        <div className="md:block md:mx-0">
          <button
            onClick={handleClickTrailer}
            className="md:block w-48 mr-1 px-12 py-3 text-sm font-medium text-white bg-gray-600 border border-gray-600 rounded active:text-gray-500 hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring"
          >
            watch trailer
          </button>
          <button
            onClick={handleSuggest}
            disabled={isAlreadySuggested}
            className={`${
              isAlreadySuggested
                ? "bg-transparent text-pink-500 hover:text-pink-500 cursor-default"
                : "bg-pink-600"
            } cursor-pointer md:block w-48 mt-1 md:ml-0 md:b-2 px-10 py-3 text-sm font-medium text-white  border border-pink-600 rounded active:text-pink-500 hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring`}
          >
            {isAlreadySuggested ? "already did it!" : "suggest it!"}
          </button>
          <ShowTrailerModal
            data={data}
            onClose={() => setVisible(false)}
            bindings={bindings}
          />
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
