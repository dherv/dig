import { MovieGroup } from "@/features/movie/MovieGroup";
import { MediaType, Show } from "@/services/tmdb/types";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";

import { add, format, startOfMonth } from "date-fns";
import type { NextPage } from "next";
import useSWR from "swr";
import { FriendshipData, Suggestion } from "../../services/supabase/types.app";
interface Props {
  user: User;
  data: { movies: Show[]; series: Show[] };
}
// TODO: consider using styled components with twin.macro to avoid too many <div> wrappers
const Movies: NextPage<Props> = ({ user, data: { movies, series } }) => {
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
    <div className="mx-auto w-full p-4 -px-2 lg:w-[1028px] overflow-hidden">
      <div className=" w-full">
        <MovieGroup
          movies={movies}
          mediaType={MediaType.Movie}
          title="Movies"
        />
      </div>
      <div className=" w-full">
        <MovieGroup movies={series} mediaType={MediaType.TV} title="Series" />
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

  const resMovie = await fetch(urlMovie);
  const { results: movies } = await resMovie.json();

  const getSeasonAirDate = async (serie: any) => {
    const urlSerieOne = `https://api.themoviedb.org/3/tv/${serie.id}?api_key=${api_key}&language=en-US`;
    const serieResponse: any = await fetch(urlSerieOne);
    const serieData: any = await serieResponse.json();
    const currentSeasonAirDate =
      serieData.seasons[serieData.seasons.length - 1].air_date;
    return { ...serie, release_date: currentSeasonAirDate };
  };

  const resSerie = await fetch(urlSerie);
  const { results: seriesResults } = await resSerie.json();
  const series = await Promise.all(seriesResults.map(getSeasonAirDate));

  let data = { movies, series };
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
