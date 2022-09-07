import { useClickOutside } from "@react-hooks-library/core";
import { FC, useRef, useState } from "react";
import { InviteModal } from "./InviteModal";

const friends = [
  { id: 1, name: "Boutch" },
  { id: 2, name: "Wistit" },
  { id: 3, name: "Allan" },
];
export const Sidebar: FC = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    closeModal();
  });

  const closeModal = () => setOpenModal(false);

  const handleInviteSend = (emails: string[]) => {
    // supabase.inviteByMail(...)
    alert(emails);
    closeModal();
  };

  const handleInviteCancel = () => {
    closeModal();
  };

  return (
    <>
      <InviteModal
        isOpenModal={isOpenModal}
        ref={ref}
        onInviteCancel={handleInviteCancel}
        onInviteSend={handleInviteSend}
      />
      <div>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.name}</li>
          ))}
        </ul>
        <button className="border" onClick={() => setOpenModal(true)}>
          invite
        </button>
      </div>
    </>
  );
};
