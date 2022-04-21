import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  stake: (state: StateT) => { state.isStaked = true; },
  input: (state: StateT, newInput: string) => { state.inputValue = newInput; },
};

export default mutations;
