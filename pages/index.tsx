import { MovieCard } from "@/features/movie/MovieCard";
import { FriendshipData, Suggestion } from "@/services/supabase/types.app";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

const SuggestionsPage = ({ user }: { user: User }) => {
  const { data: friendshipData } = useSWR(`/api/friendship`) as {
    data: FriendshipData;
  };
  const { data: suggestionsReceived } = useSWR(
    friendshipData
      ? [
          `/api/suggestions/received`,
          {
            method: "POST",
            body: JSON.stringify({
              friendIds: friendshipData.friends?.map((f) => f.id),
              friendshipIds: friendshipData.friendships,
            }),
          },
        ]
      : null
  ) as { data: Suggestion[] };

  const { data: suggestionsSent } = useSWR(
    `/api/suggestions/sent?userId=${user.id}`
  ) as { data: Suggestion[] };

  console.log({ suggestionsReceived, suggestionsSent });
  return (
    <div>
      {suggestionsSent ? (
        <>
          <h2>my suggestions</h2>
          <ul>
            {suggestionsSent.map((suggestion, index) => (
              <li key={`${suggestion.id}-${index}`}>
                <MovieCard
                  movie={suggestion.show}
                  mediaType={suggestion.show.media_type}
                />
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {suggestionsReceived && suggestionsReceived.length > 0 ? (
        <>
          <h2>friend suggestions</h2>
          <ul>
            {suggestionsReceived.map((suggestion, index) => (
              <li key={`${suggestion.id}-${index}`}>
                <MovieCard
                  movie={suggestion.show}
                  mediaType={suggestion.show.media_type}
                />
                <span>{`suggested by: ${suggestion.user?.username}`}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
});
export default SuggestionsPage;
