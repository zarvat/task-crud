import type { GetterTree } from 'vuex';
import type { UserAPI } from '@/types/api';
import type { RootState, UserState } from '@/store/types/states';
export const getters: GetterTree<UserState, RootState> = {
  getUser(state): UserAPI | null {
    const { currentUser } = state;
    return currentUser;
  },
};
