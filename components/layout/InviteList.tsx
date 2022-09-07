import { FC } from "react";

type Props = {
  emails: string[];
  onRemove: (email: string) => void;
};
export const InviteList: FC<Props> = ({ emails, onRemove }) => {
  return (
    <ul>
      {emails.map((email) => (
        <>
          <li key={email}>{email}</li>
          <button onClick={() => onRemove(email)}>X</button>
        </>
      ))}
    </ul>
  );
};
