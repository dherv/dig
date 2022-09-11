import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
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
