import { User } from "@supabase/auth-helpers-nextjs";
import { Show } from "../tmdb/types";
import type { definitions } from "./types.database";

export enum FriendshipStatus {
  Accepted = 1,
  Invited = 2,
  Cancelled = 3,
}

export type FriendshipSchema = definitions["friendships"];
export type ProfileSchema = definitions["profiles"];
export interface Friends extends ProfileSchema {}

export type FriendshipData = {
  friends: User[];
  friendships: string[];
};

export enum ShowMediaType {
  Movie = 1,
  TV = 2,
}

export type SuggestionSchema = definitions["suggestions"];
export interface SuggestionSchemaWithRelations
  extends Omit<SuggestionSchema, "show_media_type"> {
  show_media_type: definitions["show_media_types"];
  user: definitions["profiles"];
}
export interface Suggestion {
  id: SuggestionSchema["id"];
  user?: ProfileSchema;
  show: Show;
}
