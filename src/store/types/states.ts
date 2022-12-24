import type { UserCommentRedactable, UserCommentView, UserView } from '@/types/view';

export interface UserState {
  currentUser: UserView | null;
}

export interface CommentState {
  currentPage: UserCommentView[];
  newComment: UserCommentRedactable;
}

export interface RootState {
  user: UserState;
  comment: CommentState;
}
