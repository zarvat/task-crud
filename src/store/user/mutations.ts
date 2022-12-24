import type { MutationTree } from 'vuex';
import type { UserState } from '@/store/types/states';
import type { UserView } from '@/types/view';
export const mutations: MutationTree<UserState> = {
  getItem(state, payload: UserView | null) {
    state.currentUser = payload;
  },
};
