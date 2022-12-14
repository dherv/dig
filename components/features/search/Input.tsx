import { ChangeEvent, FC } from "react";

export const Input: FC<{
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, name, type, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="px-3 py-2 w-full block bg-slate-700 text-sm rounded placeholder-gray-400 placeholder-sm focus:outline-none outline-none shadow-md"
    />
  );
};
