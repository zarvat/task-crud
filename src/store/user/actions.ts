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
    const data: UserAPI | null = await MockService.readItemFromMock({
      uuid,
      entityName: ENTITY_NAMES.USER,
    }).catch((error) => {
      return Promise.reject(error);
    });

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

    const entity: UserView | null = { ...data, wall: wall };

    commit('getItem', entity);
    return entity;
  },

  async login({ commit, dispatch }, payload: LoginPayload) {
    const user = await new Promise<UserAPI>((resolve, reject) =>
      setTimeout(async () => {
        try {
          const res = await login(payload);
          resolve(res);
        } catch (e) {
          if (e instanceof Error) {
            alert(e.message);
            reject(new Error(e.message));
          }
          reject(new Error('Ошибка авторризации'));
        }
      }, 1000)
    ).catch((e) => {
      throw new Error(e);
    });
    if (user) {
      commit('login');
      //якобы получены надёжный защтщённый токен
      localStorage.setItem('user_token', `${user.login}:${payload.password}`);
      await dispatch('getItem', { uuid: user.uuid });
      return true;
    }
  },

  logout({ commit }) {
    localStorage.removeItem('user_token');
    commit('logout');
  },

  async checkIfUserLoggedIn({ state, dispatch }) {
    if (state.loggedIn) {
      return true;
    }
    const token = localStorage.getItem('user_token');
    if (!token) {
      return false;
    }
    const [login, password] = token.split(':');
    return await dispatch('login', { login, password });
  },

  async getAll({ commit }) {
    const data: UserAPI[] = await MockService.readPageFromMock({
      offset: 0,
      limit: Infinity,
      filter: [],
      entityName: ENTITY_NAMES.USER,
    }).catch((error) => {
      return Promise.reject(error);
    });

    const entities: UserView[] = data.map((user) => {
      return {
        ...user,
        wall: [],
      };
    });
    commit('getAll', entities);
  },
};
