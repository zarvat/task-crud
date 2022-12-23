import type { User } from '@/types/user';

export interface UserState {
  currentUser: User | null;
}

export interface RootState {
  user: UserState;
}
