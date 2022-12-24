import type { UserSex, UserStatus } from '@/types/enum';
import type { Entity } from '@/types/api';

export interface UserView extends Entity {
  login: string;
  password: string;
  name: string;
  avatar: string | null;
  status: UserStatus;
  age: number;
  sex: UserSex;
  wall: UserCommentView[];
}

export interface UserCommentRedactable {
  title: string;
  content: string;
}

export interface UserCommentView extends Entity, UserCommentRedactable {
  receiverID: string;
  authorID: string;
  authorName: string;
  date: Date;
}
