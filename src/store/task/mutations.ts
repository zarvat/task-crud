import type { MutationTree } from 'vuex';
import type { TaskState } from '@/store/types/states';
import type { TaskView } from '@/types/view';
import type { Pagination } from '@/store/types/params';
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
};
