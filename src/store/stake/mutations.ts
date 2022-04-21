import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  stake: (state: StateT) => { state.isStaked = true; },
  input: (state: StateT, newInput: string) => {
    if (state.isStaked) {
      return;
    }

    state.inputValue = newInput;
    state.staked = Number(newInput);
  },
};

export default mutations;
