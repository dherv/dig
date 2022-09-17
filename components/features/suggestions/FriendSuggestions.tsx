import { Suggestion as ISuggestion } from "@/services/supabase/types.app";
import { FC } from "react";
import { SuggestionCard } from "./SuggestionCard";
import { SuggestionListItem } from "./SuggestionListItem";

type Props = {
  suggestions: ISuggestion[];
};
export const FriendsSuggestions: FC<Props> = ({ suggestions }) => {
  return suggestions ? (
    <>
      <ul className="max-w-[840px] mx-auto flex">
        {[...suggestions.slice(0, 1)].map((suggestion) => (
          <>
            <SuggestionCard
              key={suggestion.id}
              movie={suggestion.show}
              mediaType={suggestion.show.media_type}
              suggestion={suggestion}
            />
          </>
        ))}
      </ul>
      <ul className="max-w-[840px] mx-auto">
        {[
          ...suggestions.slice(0, 2),
          ...suggestions.slice(0, 2),
          ...suggestions.slice(0, 2),
          ...suggestions.slice(0, 2),
          ...suggestions.slice(0, 2),
          ...suggestions.slice(0, 2),
        ].map((suggestion) => (
          <>
            <SuggestionListItem
              key={suggestion.id}
              movie={suggestion.show}
              mediaType={suggestion.show.media_type}
              suggestion={suggestion}
            />
          </>
        ))}
      </ul>
    </>
  ) : null;
};
