import { SuggestionCard } from "@/components/features/suggestions/SuggestionCard";
import { Suggestion as ISuggestion } from "@/services/supabase/types.app";
import { FC } from "react";

type Props = {
  suggestion: ISuggestion;
};
export const Suggestion: FC<Props> = ({ suggestion }) => {
  return (
    <li>
      <SuggestionCard
        movie={suggestion.show}
        mediaType={suggestion.show.media_type}
        suggestion={suggestion}
      />
    </li>
  );
};
