import type { User } from '@/types/user';
import type { MutationTree } from 'vuex';
import type { UserState } from '@/store/types/states';
export const mutations: MutationTree<UserState> = {
  getItem(state, payload: User | null) {
    state.currentUser = payload;
  },
};
