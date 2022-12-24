import type { GetterTree } from 'vuex';
import type { CommentState, RootState } from '@/store/types/states';
import type { UserCommentRedactable, UserCommentView } from '@/types/view';
export const getters: GetterTree<CommentState, RootState> = {
  getPage(state): UserCommentView[] {
    const { currentPage } = state;
    return currentPage;
  },
  getNewComment(state): UserCommentRedactable {
    const { newComment } = state;
    return newComment;
  },
};
