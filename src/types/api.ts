import type { UserSex, UserStatus, TaskMark, TaskPriority } from '@/types/enum';

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

export interface TaskAPI extends Entity {
  title: string;
  content: string;
  performerID: string;
  authorID: string;
  timestamp: number;
  mark: TaskMark;
  priority: TaskPriority;
}
