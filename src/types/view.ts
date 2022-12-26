import type { UserSex, UserStatus, TaskMark, TaskPriority } from '@/types/enum';
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

export interface TaskView extends Entity {
  title: string;
  content: string;
  performerID: string;
  authorID: string;
  authorName: string;
  performerName: string;
  date: Date;
  mark: TaskMark;
  priority: TaskPriority;
}
