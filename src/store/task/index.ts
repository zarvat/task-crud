import type { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import type { RootState, TaskState } from '@/store/types/states';
const namespaced = true;

const state: TaskState = {
  currentTask: null,
  currentPage: [],
  currentPagination: {
    offset: 0,
    limit: Infinity,
    filter: [],
  },
};

export const task: Module<TaskState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
