import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { user } from '@/store/user';
import type { RootState } from '@/store/types/states';
import { comment } from '@/store/comment';
import { task } from '@/store/task';
const key: InjectionKey<Store<RootState>> = Symbol();

const store: Store<RootState> = createStore<RootState>({
  modules: {
    user,
    comment,
    task,
  },
});

export { store, key };
