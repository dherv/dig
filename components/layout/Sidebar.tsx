import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { Friends } from "../../services/supabase/types";
import { InviteContainer } from "../base/InviteContainer";

export const Sidebar: FC = () => {
  const { data, error: errorProfile } = useSWR(`/api/friendship`);

  // TODO: move friends and friendships to cutom hook
  const [friends, setFriends] = useState<Friends[]>([]);

  useEffect(() => {
    console.log({ data }, "here");
    if (data) {
      setFriends(data.friends);
    }
  }, [data]);

  return (
    <>
      <ul>
        {friends?.map((friend) => (
          <li key={friend.username}>{friend.username}</li>
        ))}
      </ul>
      <InviteContainer />
    </>
  );
};
