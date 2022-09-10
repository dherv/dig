import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";
import { MovieCard } from "../components/base/MovieCard";

const SuggestionsPage = ({ user }: { user: User }) => {
  const { data: friendshipData, error: errorProfile } =
    useSWR(`/api/friendship`);
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
  );
  const { data: suggestionsSent } = useSWR(
    `/api/suggestions/sent?userId=${user.id}`
  );

  console.log({ received: suggestionsReceived, sent: suggestionsSent });
  return (
    <div>
      {suggestionsSent ? (
        <>
          <h2>my suggestions</h2>
          <ul>
            {suggestionsSent.map((suggestion, index) => (
              <li key={`${suggestion.id}-${index}`}>
                <MovieCard movie={suggestion.show} />
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
                <MovieCard movie={suggestion.show} />
                <span>{`suggested by: ${suggestion.user.username}`}</span>
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
  // async getServerSideProps(ctx) {
  //   // TODO: move to useSwr
  //   const sent = await fetch(`/api/suggestions/sent?`);
  //   const sentData = await sent.json();

  //   const received = await fetch(`/api/suggestions/received?friendIds=${}&friendshipIds=${}`);
  //   const receivedData = await received.json();

  //   return { props: { data: { sent: sentData, received: receivedData } } };
  // },
});
export default SuggestionsPage;
