import { ChangeEvent, FC, useState } from "react";

type Props = {
  onAdd: (email: string) => void;
};
export const InviteEmailInput: FC<Props> = ({ onAdd }) => {
  const [email, setEmail] = useState<string>();

  const clearEmail = () => setEmail("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAdd = () => {
    if (email) {
      onAdd(email);
      clearEmail();
    }
  };

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="email">
        {" "}
        Email{" "}
      </label>

      <input
        className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
        id="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={email}
        required
      />

      <button
        className="absolute p-2 text-white bg-blue-600 rounded-full -translate-y-1/2 top-1/2 right-4"
        type="button"
        onClick={handleAdd}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};
