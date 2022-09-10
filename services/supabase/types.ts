export enum FriendshipStatus {
  Accepted = 1,
  Invited = 2,
  Cancelled = 3,
}

export interface Friends {
  id: string;
  username: string;
}
