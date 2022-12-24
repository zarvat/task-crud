import type { MutationTree } from 'vuex';
import type { CommentState } from '@/store/types/states';
import type { UserCommentView } from '@/types/view';
export const mutations: MutationTree<CommentState> = {
  getPage(state, payload: UserCommentView[]) {
    state.currentPage = payload;
  },
  setNewCommentTitle(state, payload: string) {
    state.newComment.title = payload;
  },
  setNewCommentContent(state, payload: string) {
    state.newComment.content = payload;
  },
  resetNewComment(state) {
    state.newComment = {
      content: '',
      title: '',
    };
  },
};
