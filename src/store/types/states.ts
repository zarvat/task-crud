import type { TaskView, UserCommentRedactable, UserCommentView, UserView } from '@/types/view';
import type { Pagination } from '@/store/types/params';

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
  currentTask: TaskView | null;
  currentPage: TaskView[];
  currentPagination: Pagination;
}
