import type { UserSex, UserStatus } from '@/types/enum';

export interface Entity {
  uuid: string;
}

export interface UserAPI extends Entity {
  login: string;
  password: string;
  name: string;
  avatar: string | null;
  status: UserStatus;
  age: number;
  sex: UserSex;
}

export interface UserCommentAPI extends Entity {
  title: string;
  content: string;
  receiverID: string;
  authorID: string;
  timestamp: number;
}
