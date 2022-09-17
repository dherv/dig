import { MovieGroup } from "@/features/movie/MovieGroup";
import { MediaType, Show } from "@/services/tmdb/types";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";

import { add, format, startOfMonth } from "date-fns";
import type { NextPage } from "next";
import useSWR from "swr";
import { FriendshipData, Suggestion } from "../../services/supabase/types.app";
interface Props {
  user: User;
  data: Show[];
}
// TODO: consider using styled components with twin.macro to avoid too many <div> wrappers
const Movies: NextPage<Props> = ({ user, data }) => {
  const { data: friendshipData } = useSWR(`/api/friendship`) as {
    data: FriendshipData;
  };

  const { data: friendSuggestions } = useSWR(
    friendshipData
      ? [
          `/api/suggestions/received`,
          {
            method: "POST",
            body: JSON.stringify({
              friendIds: friendshipData.friends?.map((friend) => friend.id),
              friendshipIds: friendshipData.friendships,
            }),
          },
        ]
      : null
  ) as { data: Suggestion[] };

  return (
    <div className="mx-auto w-[1280px] overflow-hidden">
      <h2 className="font-bold text-lg">Movies</h2>
      <div className="my-6 w-full">
        <MovieGroup movies={data} mediaType={MediaType.Movie} />
      </div>
      <h2 className="font-bold text-lg">Series</h2>
      <div className="my-6 w-full">
        <MovieGroup movies={data} mediaType={MediaType.Movie} />
      </div>
    </div>
  );
};

const getMovies = async () => {
  const api_key = process.env.NEXT_PUBLIC_TMDB_KEY;
  const date_start = format(
    add(startOfMonth(new Date()), { months: 0 }),
    "yyyy-MM-dd"
  );
  const date_end = format(
    add(startOfMonth(new Date()), { months: 2 }),
    "yyyy-MM-dd"
  );
  // add enum/types for all tmdb stuff
  const movieDateType = "release_date";
  const tvDateType = "air_date";
  const amazonCode = "119|9";
  const netflixCode = "8";
  const disneyPlusCode = "337";
  const countryCode = "US";

  const urlMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&${movieDateType}.gte=${date_start}&${movieDateType}.lte=${date_end}&with_release_type=4`;
  const urlSerie = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&${tvDateType}.gte=${date_start}&${tvDateType}.lte=${date_end}&with_release_type=4`;

  const url = urlMovie;
  const res = await fetch(url);
  const { results } = await res.json();

  let data;
  if (url === urlSerie) {
    const getSeasonAirDate = async (serie: any) => {
      const urlSerieOne = `https://api.themoviedb.org/3/tv/${serie.id}?api_key=${api_key}&language=en-US`;
      const serieResponse: any = await fetch(urlSerieOne);
      const serieData: any = await serieResponse.json();
      const currentSeasonAirDate =
        serieData.seasons[serieData.seasons.length - 1].air_date;
      return { ...serie, release_date: currentSeasonAirDate };
    };
    const serieMapped = await Promise.all(results.map(getSeasonAirDate));
    data = serieMapped;
  } else {
    data = results;
  }
  // Pass data to the page via props
  return { props: { data } };
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    return await getMovies();
  },
});

export default Movies;
