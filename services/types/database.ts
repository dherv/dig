import { User } from "@supabase/auth-helpers-nextjs";
import { Show } from "../tmdb/types";

export interface Suggestion {
  show: Show;
  user?: User;
}

export enum ShowMediaType {
  Movie = 1,
  Serie = 2,
}
