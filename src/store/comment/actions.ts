import type { ActionTree } from 'vuex';
import MockService from '@/services/mock.service';
import { ENTITY_NAMES } from '@/constants';
import type { IDPayload, PayloadForCommentsPage } from '@/store/types/params';
import type { UserCommentAPI } from '@/types/api';
import type { RootState, CommentState } from '@/store/types/states';
import type { UserCommentView, UserView } from '@/types/view';
import { uuidGenerator } from '@/utils/uuidGenerator';
import { getUsersByIDs } from '@/utils/getUsersByIDs';

export const actions: ActionTree<CommentState, RootState> = {
  async getPage({ commit }, payload: PayloadForCommentsPage) {
    const { offset, limit, receiverID } = payload;
    const filter = [{ field: 'receiverID', value: receiverID }];

    const data: UserCommentAPI[] = await MockService.readPageFromMock({
      offset,
      limit,
      filter,
      entityName: ENTITY_NAMES.COMMENT,
    }).catch((error) => {
      return Promise.reject(error);
    });

    const commentsForReceiver: UserCommentAPI[] = data.filter((comment) => {
      return comment.receiverID === receiverID;
    });

    const authorIDsInComments = new Set<string>();

    for (const comment of commentsForReceiver) {
      authorIDsInComments.add(comment.authorID);
    }

    const authors = await getUsersByIDs(authorIDsInComments);

    const entities: UserCommentView[] = data.map((comment) => {
      const author = authors.find((author) => author.uuid === comment.authorID);
      if (!author) {
        throw new Error(`Пользователь с id ${comment.authorID} не найден`);
      }
      return { ...comment, authorName: author.name, date: new Date(comment.timestamp) };
    });
    commit('getPage', entities);
  },

  async setNewComment({ commit, state, dispatch, rootGetters }) {
    const user: UserView = rootGetters['user/getUser'];

    const commentForApi: UserCommentAPI = {
      uuid: uuidGenerator(),
      timestamp: Date.now(),
      authorID: user.uuid,
      receiverID: user.uuid,
      ...state.newComment,
    };

    const data: boolean = await MockService.appendItemToMock({
      entityName: ENTITY_NAMES.COMMENT,
      item: commentForApi,
    }).catch((error) => {
      return Promise.reject(error);
    });

    const payload: IDPayload = {
      uuid: user.uuid,
    };

    commit('resetNewComment');
    await dispatch('user/getItem', payload, { root: true });
  },
};
