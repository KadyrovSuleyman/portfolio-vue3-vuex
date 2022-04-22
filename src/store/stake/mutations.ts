import { MutationTree } from 'vuex';
import { StateT } from './state';

const mutations: MutationTree<StateT> = {
  stake: (state: StateT) => { state.isStaked = true; },
  unstake: (state: StateT) => { state.isStaked = false; },
  input: (state: StateT, newInput: string) => {
    if (state.isStaked) {
      return;
    }

    state.inputValue = newInput;
    state.staked = Number(newInput);
  },

  replenish: (state: StateT, value: number) => {
    state.staked += value;
  },

  mockCountdown: (state: StateT, msec: number) => {
    state.restakeCountdown = msec;
  },
};

export default mutations;
