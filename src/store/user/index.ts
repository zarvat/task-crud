import type { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import type { RootState, UserState } from '@/store/types/states';
const namespaced = true;

const state: UserState = {
  currentUser: null,
};

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
