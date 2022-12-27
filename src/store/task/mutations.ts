import type { MutationTree } from 'vuex';
import type { TaskState } from '@/store/types/states';
import type { TaskView, UserView } from '@/types/view';
import type { Pagination } from '@/store/types/params';
import { TaskMark, TaskPriority } from '@/types/enum';
export const mutations: MutationTree<TaskState> = {
  getItem(state, payload: TaskView | null) {
    state.currentTask = payload;
  },
  getPage(state, payload: TaskView[]) {
    state.currentPage = payload;
  },
  getPagination(state, payload: Pagination) {
    state.currentPagination = payload;
  },
  resetItem(state, payload: UserView) {
    state.currentTask = {
      uuid: '',
      authorID: payload.uuid,
      title: '',
      date: new Date(),
      authorName: payload.name,
      content: '',
      mark: TaskMark['BACKEND'],
      performerID: payload.uuid,
      priority: TaskPriority['LOW'],
      performerName: payload.name,
    };
  },
};
