import type { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import type { CommentState, RootState } from '@/store/types/states';
const namespaced = true;

const state: CommentState = {
  currentPage: [],
  newComment: {
    content: '',
    title: '',
  },
};

export const comment: Module<CommentState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
