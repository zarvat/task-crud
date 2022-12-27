import type { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import type { RootState, TaskState } from '@/store/types/states';
import { TaskMark, TaskPriority } from '@/types/enum';
const namespaced = true;

const state: TaskState = {
  currentTask: {
    uuid: 'new',
    authorID: '',
    title: '',
    date: new Date(),
    authorName: '',
    content: '',
    mark: TaskMark['BACKEND'],
    performerID: '',
    priority: TaskPriority['LOW'],
    performerName: '',
  },
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
