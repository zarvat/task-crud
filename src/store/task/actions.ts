import type { ActionTree } from 'vuex';
import MockService from '@/services/mock.service';
import { ENTITY_NAMES } from '@/constants';
import type { IDPayload, LoginPayload, PayloadForCommentsPage } from '@/store/types/params';
import type { UserAPI } from '@/types/api';
import type { RootState, TaskState } from '@/store/types/states';
import type { UserView } from '@/types/view';
import { login } from '@/api/auth/login';

export const actions: ActionTree<TaskState, RootState> = {
  async getItem({ dispatch, rootGetters, commit }, payload: IDPayload) {
    const { uuid } = payload;
    await MockService.readItemFromMock({ uuid, entityName: ENTITY_NAMES.USER })
      .then(async (response) => {
        const data: UserAPI | null = response;

        if (!data) {
          commit('getItem', null);
          return Promise.resolve(data);
        }

        const payload: PayloadForCommentsPage = {
          offset: 0,
          limit: 10,
          receiverID: data.uuid,
        };

        await dispatch('comment/getPage', payload, { root: true }).then(() => {
          const wall = rootGetters['comment/getPage'];

          const entityName: UserView | null = { ...data, wall: wall };

          commit('getItem', entityName);
          Promise.resolve();
        });
        return Promise.resolve(data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  async login({ commit }, payload: LoginPayload) {
    const loggedIn = await login(payload);
    if (loggedIn) {
      commit('login');
    }
  },
};
