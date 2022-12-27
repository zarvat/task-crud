import type { GetterTree } from 'vuex';
import type { RootState, UserState } from '@/store/types/states';
import type { UserView } from '@/types/view';
export const getters: GetterTree<UserState, RootState> = {
  getUser(state): UserView | null {
    const { currentUser } = state;
    return currentUser;
  },
  loggedIn(state): boolean {
    const { loggedIn } = state;
    return loggedIn;
  },
  getAll(state): UserView[] {
    const { allUsers } = state;
    return allUsers;
  },
};
