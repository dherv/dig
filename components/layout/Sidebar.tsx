import { FC } from "react";
import { InviteContainer } from "../base/InviteContainer";

const friends = [
  { id: 1, name: "Boutch" },
  { id: 2, name: "Wistit" },
  { id: 3, name: "Allan" },
];
export const Sidebar: FC = () => {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
      <InviteContainer />
    </>
  );
};
