import { forwardRef, useState } from "react";
import { InviteEmailInput } from "./InviteEmailInput";
import { InviteList } from "./InviteList";

type Props = {
  isOpenModal: boolean;
  onInviteCancel: () => void;
  onInviteSend: (emails: string[]) => void;
};

export const InviteModal = forwardRef<HTMLDivElement, Props>(
  ({ isOpenModal, onInviteCancel, onInviteSend }, ref) => {
    // TODO: useReducer instead
    const [emails, setEmails] = useState<string[]>([]);

    const clearEmails = () => setEmails([]);
    const handleAddEmail = (email: string) => {
      setEmails((prev) => [...prev, email]);
    };

    const handleRemoveEmail = (email: string) => {
      setEmails((prev) => prev.filter((prevEmail) => prevEmail !== email));
    };

    const handleInviteSend = () => {
      clearEmails();
      onInviteSend(emails);
    };

    const handleInviteCancel = () => {
      clearEmails();
      onInviteCancel();
    };

    return isOpenModal ? (
      <>
        <div className="absolute right-0 top-0 left-0 bottom-0 w-screen h-screen bg-gray-500 opacity-50"></div>
        <div
          ref={ref}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-8 bg-white rounded-lg shadow-2xl"
        >
          <h2 className="text-lg font-bold">Invite some mates?</h2>

          <InviteEmailInput onAdd={handleAddEmail} />
          <InviteList emails={emails} onRemove={handleRemoveEmail} />

          <p className="mt-2 text-sm text-gray-500">
            Are you ok with this invite list? Give it a go ?
          </p>
          <div className="flex items-center justify-end mt-8 text-xs">
            <button
              type="button"
              className="px-4 py-2 font-medium text-green-600 rounded bg-green-50"
              onClick={handleInviteSend}
            >
              {`Yes, I'm sure`}
            </button>
            <button
              type="button"
              className="px-4 py-2 ml-2 font-medium text-gray-600 rounded bg-gray-50"
              onClick={handleInviteCancel}
            >
              No, go back
            </button>
          </div>
        </div>
      </>
    ) : null;
  }
);

InviteModal.displayName = "InviteModal";
