import { Suggestion as ISuggestion } from "@/services/supabase/types.app";
import { FC } from "react";
import { SuggestionCard } from "./SuggestionCard";

type Props = {
  suggestions: ISuggestion[];
};
export const UserSuggestions: FC<Props> = ({ suggestions }) => {
  return suggestions ? (
    <ul className="grid grid-cols-2">
      {suggestions.map((suggestion) => (
        <SuggestionCard
          key={suggestion.id}
          movie={suggestion.show}
          mediaType={suggestion.show.media_type}
          suggestion={suggestion}
        />
      ))}
    </ul>
  ) : null;
};
