import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  stake: (state: StateT) => { state.isStaked = true; },
};

export default mutations;
