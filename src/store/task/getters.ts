import type { GetterTree } from 'vuex';
import type { TaskView } from '@/types/view';
import type { RootState, TaskState } from '@/store/types/states';
import type { Pagination } from '@/store/types/params';
export const getters: GetterTree<TaskState, RootState> = {
  getTask(state): TaskView | null {
    const { currentTask } = state;
    return currentTask;
  },
  getPage(state): TaskView[] {
    const { currentPage } = state;
    return currentPage;
  },
  getCurrentPagination(state): Pagination {
    const { currentPagination } = state;
    return currentPagination;
  },
};
