import { useClickOutside } from "@react-hooks-library/core";
import { FC, useRef, useState } from "react";
import { ErrorService } from "../../../services/error";
import { InviteModal } from "./InviteModal";

export const InviteContainer: FC = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    closeModal();
  });

  const closeModal = () => setOpenModal(false);

  const handleInviteSend = async (emails: string[]) => {
    fetch(`/api/auth/invite`, {
      method: "POST",
      body: JSON.stringify({ emails: emails }),
    })
      .then((res) => {
        if (res.ok) {
          closeModal();
        }
      })
      .catch((error) => ErrorService.catchError(error));
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
      <button className="border" onClick={() => setOpenModal(true)}>
        invite
      </button>
    </>
  );
};
