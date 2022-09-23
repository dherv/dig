import { Suggestions } from "@/components/features/suggestions/Suggestions";
import { FriendshipData, Suggestion } from "@/services/supabase/types.app";
import { User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import { SuggestionSwitch } from "../components/features/suggestions/SuggestionSwitch";

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "user_suggestions") {
      return setShowUserSuggestions(true);
    }
    return setShowUserSuggestions(false);
  };
  return (
    <div className="mx-auto my-2">
      <div className="mx-auto w-fit">
        <SuggestionSwitch onChange={handleChange} />
      </div>
      {/* <h2 className="first-letter:uppercase font-medium">friend suggestions</h2> */}

      {showUserSuggestions ? (
        <Suggestions
          suggestions={userSuggestions}
          withAvatar={false}
          type="user"
        />
      ) : (
        <Suggestions
          suggestions={friendSuggestions}
          withAvatar={true}
          type="friends"
        ></Suggestions>
      )}
    </div>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
});
export default SuggestionsPage;
