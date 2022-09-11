import { Spacer } from "@/layout/Spacer";
import { Suggestion as ISuggestion } from "@/services/supabase/types.app";
import { FC } from "react";
import { Suggestion } from "./Suggestion";

type Props = {
  suggestions: ISuggestion[];
};
export const FriendsSuggestions: FC<Props> = ({ suggestions }) => {
  return suggestions ? (
    <ul>
      {suggestions.map((suggestion) => (
        <>
          <Suggestion suggestion={suggestion} key={suggestion.id} />
          <Spacer size={6} />
        </>
      ))}
    </ul>
  ) : null;
};
