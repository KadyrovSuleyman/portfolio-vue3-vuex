import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  start: (state: StateT, what: string) => {
    state[what] = true;
  },
  stop: (state: StateT, what: string) => {
    state[what] = false;
  },
};

export default mutations;
