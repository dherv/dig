import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import Image from "next/image";
import * as SWR from "../../services/swr";
import * as TMDB from "../../services/tmdb";
import { MediaType, Show } from "../../services/tmdb/types";

interface Props {
  user: User;
  data: any;
  type: MediaType;
}
// TODO: consider using styled components with twin.macro to avoid too many <div> wrappers
const MoviePage: NextPage<Props> = ({
  user,
  data,
  type,
}: {
  user: User;
  data: Show;
}) => {
  console.log({ data });
  return (
    <article>
      <div>
        {type === MediaType.Movie ? data.original_title : data.original_name}
      </div>
      <Image
        src={TMDB.posterPath(data.backdrop_path, { size: "w780" })}
        alt="backdrop of the movie or serie"
        width={533}
        height={300}
      />
      <p>{data.overview}</p>
    </article>
  );
};

const getShow = async (type?: string, showId?: string | string[]) => {
  const url = TMDB.url(`/${type}/${showId}`);
  const data = await SWR.fetcher(url);
  return { props: { data, type } };
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    if (typeof ctx.query.mediaType === "string") {
      return await getShow(ctx.query.mediaType, ctx.params?.id);
    }
    return { props: { data: undefined } };
  },
});

export default MoviePage;
