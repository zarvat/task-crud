import type { ActionTree } from 'vuex';
import MockService from '@/services/mock.service';
import { ENTITY_NAMES } from '@/constants';
import type { IDPayload, Pagination } from '@/store/types/params';
import type { TaskAPI } from '@/types/api';
import type { RootState, TaskState } from '@/store/types/states';
import { getUsersByIDs } from '@/utils/getUsersByIDs';
import type { TaskView } from '@/types/view';
import { uuidGenerator } from '@/utils/uuidGenerator';

export const actions: ActionTree<TaskState, RootState> = {
  async getItem({ commit }, payload: IDPayload) {
    const { uuid } = payload;
    const data: TaskAPI | null = await MockService.readItemFromMock({
      uuid,
      entityName: ENTITY_NAMES.TASK,
    }).catch((error) => {
      return Promise.reject(error);
    });
    commit('getItem', data);
  },

  async getPage({ commit, getters }) {
    const pagePayload = getters.getCurrentPagination;
    const data: TaskAPI[] = await MockService.readPageFromMock({
      ...pagePayload,
      entityName: ENTITY_NAMES.TASK,
    }).catch((error) => {
      return Promise.reject(error);
    });

    const usersInTasks = new Set<string>();

    for (const tasks of data) {
      usersInTasks.add(tasks.authorID);
      usersInTasks.add(tasks.performerID);
    }

    const users = await getUsersByIDs(usersInTasks);
    const entities: TaskView[] = data.map((task) => {
      const author = users.find((user) => user.uuid === task.authorID);
      if (!author) {
        throw new Error(`Пользователь с id ${task.authorID} не найден`);
      }
      const performer = users.find((user) => user.uuid === task.performerID);
      if (!performer) {
        throw new Error(`Пользователь с id ${task.performerID} не найден`);
      }
      return {
        ...task,
        authorName: author.name,
        performerName: performer.name,
        date: new Date(task.timestamp),
      };
    });
    commit('getPage', entities);
  },

  async updateItem({ dispatch, getters, rootGetters, commit }, payload: TaskAPI) {
    await MockService.updateItemInMock({
      item: payload,
      entityName: ENTITY_NAMES.TASK,
    }).catch((error) => {
      return Promise.reject(error);
    });

    const pagePayload = getters.getCurrentPagination;
    const users = rootGetters['user/getAll'];
    commit('resetItem', users[0]);
    await dispatch('task/getPage', pagePayload, { root: true });
  },

  async createItem({ dispatch, getters, rootGetters, commit }, payload: TaskAPI) {
    await MockService.appendItemToMock<TaskAPI>({
      item: { ...payload, timestamp: Date.now(), uuid: uuidGenerator() },
      entityName: ENTITY_NAMES.TASK,
    }).catch((error) => {
      return Promise.reject(error);
    });

    const pagePayload = getters.getCurrentPagination;
    const users = rootGetters['user/getAll'];
    commit('resetItem', users[0]);
    await dispatch('task/getPage', { ...pagePayload }, { root: true });
  },

  async deleteItem({ getters, dispatch }, payload: IDPayload) {
    const { uuid } = payload;
    const data: boolean = await MockService.removeFromMock({
      uuid,
      entityName: ENTITY_NAMES.TASK,
    }).catch((error) => {
      return Promise.reject(error);
    });
    const pagePayload = getters.getCurrentPagination;
    await dispatch('task/getPage', pagePayload, { root: true });
  },

  async setPagination({ commit, dispatch, getters }, payload: Pagination) {
    commit('getPagination', payload);
    const pagePayload = getters.getCurrentPagination;
    await dispatch('task/getPage', pagePayload, { root: true });
  },

  async resetItem({ commit, rootGetters }) {
    const users = rootGetters['user/getAll'];
    commit('resetItem', users[0]);
  },
};
