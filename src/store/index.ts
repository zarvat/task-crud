import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { user } from '@/store/user';
import type { RootState } from '@/store/types/states';
import { comment } from '@/store/comment';
const key: InjectionKey<Store<RootState>> = Symbol();

const store: Store<RootState> = createStore<RootState>({
  modules: {
    user,
    comment,
  },
});

export { store, key };
