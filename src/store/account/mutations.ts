/* eslint-disable no-param-reassign */
import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  load: (state: StateT, newState: StateT) => {
    state = { ...newState };
  },
};

export default mutations;
