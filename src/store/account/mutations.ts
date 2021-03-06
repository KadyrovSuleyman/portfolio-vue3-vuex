import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  load: (state: StateT, newState: StateT) => {
    state.address = newState.address;
    state.balance = newState.balance;
  },
};

export default mutations;
