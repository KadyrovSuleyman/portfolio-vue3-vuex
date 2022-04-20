import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  show: (state: StateT, payload: string) => { state[payload] = true; },
  hide: (state: StateT, payload: string) => { state[payload] = false; },
};

export default mutations;
