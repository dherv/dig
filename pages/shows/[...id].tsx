import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import { IconButton } from "@mui/joy";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { Rank } from "../../components/features/movie/Rank";
import { ShowTrailerModal } from "../../components/features/show/ShowTrailerModal";
import { ErrorService } from "../../services/error";
import { Friends, Suggestion } from "../../services/supabase/types.app";
import * as TMDB from "../../services/tmdb";
import { Genre, MediaType, Show } from "../../services/tmdb/types";
interface Props {
  user: User;
  show: Show | null;
  type: MediaType;
}

export const Genres: FC<{ genres: Genre[] }> = ({ genres }) => {
  return (
    <div>
      {genres.map((genre) => (
        <strong
          key={genre.id}
          className="inline-block my-1 mr-2 border text-gray-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide"
        >
          {genre.name}
        </strong>
      ))}
    </div>
  );
};

const ArticleHeader: FC<{
  show: Show;
  releaseDate: string;
  type: MediaType;
  rank: string;
  runtime?: string;
}> = ({ show, releaseDate, type, rank, runtime }) => {
  return (
    <div className="flex py-4 px-4 xl:px-0">
      <div className="">
        <h2 className="font-medium text-3xl">
          {type === MediaType.Movie ? show.title : show.name}
        </h2>
        <div className="flex items-end leading-4 my-2 text-sm ">
          <span className="mr-2 font-thin text-gray-500">{releaseDate}</span>
          {runtime ? (
            <>
              <span className="font-thin text-gray-500">.</span>
              <span className="ml-2 font-thin text-gray-500">{runtime}</span>
            </>
          ) : null}
          <div className="flex items-end ml-4">
            <Rank size={20} vote={show.vote_average} />
            {show.vote_average > 0 ? (
              <p className="font-bold ml-2">{rank}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
// TODO: consider using styled components with twin.macro to avoid too many <div> wrappers
const MoviePage: NextPage<Props> = ({ user, show, type }) => {
  const [isVisible, setVisible] = useState<boolean>(false);

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

  if (!show) {
    return <div>this show has not been found</div>;
  }

  const handleSuggest = async () => {
    try {
      const res = await fetch(`/api/suggestions`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          showId: show.id,
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
    (suggestion) => suggestion.show.id === show.id
  );

  const rank = show.vote_average.toFixed(1);

  const runtime = TMDB.getRuntime(show, type, TMDB.formatRuntime);
  const releaseDate = TMDB.getReleaseDate(show, type);

  const handleClickTrailer = () => {
    console.log("TRAILER");
    setVisible(true);
  };

  const imageSrc = show.backdrop_path
    ? TMDB.posterPath(show.backdrop_path, { size: "w1280" })
    : `https://dummyimage.com/16:9x1280/efefef/212121.jpg&text=${show.title}`;

  console.log(show);
  return show ? (
    <article className="relative my-4 mx-auto max-w-[1280px]">
      {/* <ArticleHeader
        show={show}
        releaseDate={releaseDate}
        rank={rank}
        type={type}
        runtime={runtime}
      /> */}

      <div className="flex my-4 shadow-md rounded flex-wrap w-full">
        <div className="relative w-full md:w-3/4 md:mr-2">
          <Image
            src={imageSrc}
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
        <div className="flex flex-col justify-between w-full md:w-1/4 bg-slate-900 px-6 py-4">
          <div>
            <h2 className="font-black text-3xl">
              {type === MediaType.Movie ? show.title : show.name}
            </h2>
            <p className="my-6 text-sm text-slate-100">{show.overview}</p>
          </div>

          <div className="mt-2 font-medium text-xs md:text-sm  text-center text-white">
            <IconButton
              color="neutral"
              disabled={isAlreadySuggested}
              onClick={handleSuggest}
              className="mx-2"
            >
              <VerifiedIcon className="w-6 h-6" />
            </IconButton>
            <IconButton
              color="neutral"
              disabled={show.videos.results.length === 0}
              onClick={handleClickTrailer}
              className="mx-2"
            >
              <PlayCircleFilledWhiteOutlinedIcon className="w-6 h-6" />
            </IconButton>
          </div>
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
        <div className="my-1 md:mr-2">
          <Genres genres={show.genres} />
          {/* <p className="max-w-[600px] my-4 mx-1 md:mx-0">{show.overview}</p> */}
        </div>

        {/* <div className="md:block md:mx-0">
          <button
            disabled={show.videos.results.length === 0}
            onClick={handleClickTrailer}
            className={`${
              show.videos.results.length === 0
                ? "bg-transparent text-gray-500 hover:text-gray-500 cursor-default"
                : "bg-gray-600"
            } md:block w-48 mr-1 px-12 py-3 text-sm font-medium text-white bg-gray-600 border border-gray-600 rounded active:text-gray-500 hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring`}
          >
            {show.videos.results.length === 0 ? "no trailer" : "watch trailer"}
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
        </div> */}
        <ShowTrailerModal
          data={show}
          isOpen={isVisible}
          onClose={() => setVisible(false)}
        />
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
        return { props: { show: data, type: ctx.query.mediaType } };
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
