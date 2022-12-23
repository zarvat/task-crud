import type { GetterTree } from 'vuex';
import type { User } from '@/types/user';
import type { RootState, UserState } from '@/store/types/states';
export const getters: GetterTree<UserState, RootState> = {
  getUser(state): User | null {
    const { currentUser } = state;
    return currentUser;
  },
};
