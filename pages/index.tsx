import { SuggestionsList } from "@/components/features/suggestions/SuggestionsList";
import { FriendshipData, Suggestion } from "@/services/supabase/types.app";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";

const SuggestionsPage = ({ user }: { user: User }) => {
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [checked, setChecked] = useState(false);

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
    setChecked((prev) => !prev);
    if (event.target.value === "user_suggestions") {
      return setShowUserSuggestions(true);
    }
    return setShowUserSuggestions(false);
  };
  console.log({ userSuggestions, friendSuggestions });
  return (
    <div className="max-w-[840px] mx-auto">
      <div className="flex justify-start my-8 ">
        {/* TODO: extract text to css variable or tailwind */}
        <span className="dark:text-gray-300 text-sm font-medium">show</span>
        <span className="mx-4"> | </span>
        <div>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={checked}
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-slate-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              only mine
            </span>
          </label>
        </div>

        {/* <SuggestionSwitch onChange={handleChange} /> */}
      </div>
      {/* <h2 className="first-letter:uppercase font-medium">friend suggestions</h2> */}

      {checked ? (
        <SuggestionsList
          suggestions={userSuggestions}
          withAvatar={false}
          type="user"
        />
      ) : (
        <SuggestionsList
          suggestions={friendSuggestions}
          withAvatar={true}
          type="friends"
        ></SuggestionsList>
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  console.log(session.user);
  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default SuggestionsPage;
