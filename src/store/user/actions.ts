import type { ActionTree } from 'vuex';
import MockService from '@/services/mock.service';
import { ENTITY_NAMES } from '@/constants';
import type { IDPayload, Params } from '@/store/types/params';
import type { User } from '@/types/user';
import type { RootState, UserState } from '@/store/types/states';
export const actions: ActionTree<UserState, RootState> = {
  async getItem({ commit }, payload: IDPayload) {
    const { uuid } = payload;
    await MockService.readItemFromFile({ uuid, entity: ENTITY_NAMES.USER })
      .then((response) => {
        const data: User | null = response;
        commit('getItem', data);
        return Promise.resolve(data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};
