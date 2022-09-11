import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Friends } from "../../services/supabase/types";
import * as TMDB from "../../services/tmdb";
import { MediaType, Show } from "../../services/tmdb/types";

interface Props {
  user: User;
  data: Show;
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
  type: MediaType;
}) => {
  const { data: friendshipData, error: errorProfile } =
    useSWR(`/api/friendship`);
  const { data: suggestionsSent } = useSWR(
    `/api/suggestions/sent?userId=${user.id}`
  );

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
          showId: data.id,
          showMediaType: type,
        }),
      });

      const newSuggestion = await res.json();
    } catch (error) {
      console.error({ error });
    }
  };

  // TODO: move to api to check suggestion - especially after pagination of suggestions
  const isAlreadySuggested = suggestionsSent?.some(
    (suggestion) => suggestion.show.id === data.id
  );

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
      <button onClick={handleSuggest} disabled={isAlreadySuggested}>
        {isAlreadySuggested ? "already did it!" : "suggest it!"}
      </button>
    </article>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    if (typeof ctx.query.mediaType === "string") {
      const data = await TMDB.getShow(ctx.query.mediaType, ctx.params?.id);
      return { props: { data, type: ctx.query.mediaType } };
    }
    return { props: { data: undefined } };
  },
});

export default MoviePage;
