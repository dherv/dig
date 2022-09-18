import { FriendsSuggestions } from "@/components/features/suggestions/FriendSuggestions";
import { UserSuggestions } from "@/components/features/suggestions/UserSuggetions";
import { FriendshipData, Suggestion } from "@/services/supabase/types.app";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";

const SuggestionsPage = ({ user }: { user: User }) => {
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);

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

  const { data: userSuggestions } = useSWR(
    `/api/suggestions/sent?userId=${user.id}`
  ) as { data: Suggestion[] };

  return (
    <div className="mx-auto my-12 md:w-[1280px]">
      {/* <h2 className="first-letter:uppercase font-medium">friend suggestions</h2> */}
      <FriendsSuggestions suggestions={friendSuggestions}></FriendsSuggestions>
      <button onClick={() => setShowUserSuggestions((prev) => !prev)}>
        toggle my suggestions
      </button>
      {showUserSuggestions ? (
        <>
          <h2>my suggestions</h2>
          <UserSuggestions suggestions={userSuggestions} />
        </>
      ) : null}
    </div>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
});
export default SuggestionsPage;
