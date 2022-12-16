import { Suggestion as ISuggestion } from "@/services/supabase/types.app";
import { FC } from "react";
import { SuggestionListItem } from "./SuggestionListItem";

type Props = {
  suggestions: ISuggestion[];
  withAvatar: boolean;
  type: "friends" | "user";
};
export const SuggestionsList: FC<Props> = ({
  suggestions,
  withAvatar,
  type,
}) => {
  console.log({ suggestions });
  return suggestions && suggestions.length ? (
    <ul className="">
      {suggestions.map((suggestion) => (
        <SuggestionListItem
          key={suggestion.id}
          movie={suggestion.show}
          mediaType={suggestion.show.media_type}
          suggestion={suggestion}
          withAvatar={withAvatar}
        />
      ))}
    </ul>
  ) : (
    <div className="flex justify-center items-center mt-8">
      <span className="text-gray-500">
        {type === "friends" ? "the" : "your"} suggestion list is empty
      </span>
    </div>
  );
};
