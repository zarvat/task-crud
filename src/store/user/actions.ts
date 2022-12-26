import type { ActionTree } from 'vuex';
import MockService from '@/services/mock.service';
import { ENTITY_NAMES } from '@/constants';
import type { IDPayload, LoginPayload, PayloadForCommentsPage } from '@/store/types/params';
import type { UserAPI } from '@/types/api';
import type { RootState, UserState } from '@/store/types/states';
import type { UserView } from '@/types/view';
import { login } from '@/api/auth/login';

export const actions: ActionTree<UserState, RootState> = {
  async getItem({ dispatch, rootGetters, commit }, payload: IDPayload) {
    const { uuid } = payload;
    const userFromApi = await MockService.readItemFromMock({
      uuid,
      entityName: ENTITY_NAMES.USER,
    }).catch((error) => {
      return Promise.reject(error);
    });
    const data: UserAPI | null = userFromApi;

    if (!data) {
      commit('getItem', null);
      return;
    }

    const commentPayload: PayloadForCommentsPage = {
      offset: 0,
      limit: 10,
      receiverID: data.uuid,
    };

    await dispatch('comment/getPage', commentPayload, { root: true });
    const wall = rootGetters['comment/getPage'];

    const entityName: UserView | null = { ...data, wall: wall };

    commit('getItem', entityName);
  },

  async login({ commit, dispatch }, payload: LoginPayload) {
    const user = await login(payload);
    if (user) {
      commit('login');
      await dispatch('user/getItem', { uuid: user.uuid }, { root: true });
    }
  },
};
