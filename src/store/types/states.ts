import type { UserCommentRedactable, UserCommentView, UserView } from '@/types/view';

export interface UserState {
  currentUser: UserView | null;
  loggedIn: boolean;
}

export interface CommentState {
  currentPage: UserCommentView[];
  newComment: UserCommentRedactable;
}

export interface RootState {
  user: UserState;
  comment: CommentState;
}

export interface TaskState {
  currentTask: UserView | null;
  currentPage: boolean;
}
