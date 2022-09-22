import { ChangeEvent, FC } from "react";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SuggestionSwitch: FC<Props> = ({ onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="relative w-[150px]">
        <input
          className="hidden group peer"
          type="radio"
          name="shippingOption"
          value="friends_suggestions"
          id="friends_suggestions"
          onChange={onChange}
          defaultChecked={true}
        />

        <label
          className="block p-4 text-sm font-medium border border-gray-100 rounded-lg cursor-pointer transition-colors shadow-sm peer-checked:border-pink-500 hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-pink-500"
          htmlFor="friends_suggestions"
        >
          <span> Friends </span>

          {/* <span className="block mt-1 text-xs text-gray-500">Free</span> */}
        </label>

        <svg
          className="absolute w-5 h-5 text-pink-600 opacity-0 top-4 right-4 peer-checked:opacity-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="relative w-[150px]">
        <input
          className="hidden group peer"
          type="radio"
          name="shippingOption"
          value="user_suggestions"
          id="user_suggestions"
          onChange={onChange}
          defaultChecked={false}
        />

        <label
          className="block p-4 text-sm font-medium border border-gray-100 rounded-lg cursor-pointer transition-colors shadow-sm peer-checked:border-pink-500 hover:bg-gray-50 peer-checked:ring-1 peer-checked:ring-pink-500"
          htmlFor="user_suggestions"
        >
          <span> Yours </span>

          {/* <span className="block mt-1 text-xs text-gray-500">$ 5.99</span> */}
        </label>

        <svg
          className="absolute w-5 h-5 text-pink-600 opacity-0 top-4 right-4 peer-checked:opacity-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
