import { MutationTree } from 'vuex';
import { StateT } from './state';
import { WalletT } from './types.d';

const mutations: MutationTree<StateT> = {
  'load-list': (state: StateT, list: WalletT[]) => {
    state.list = list;
  },
  select: (state: StateT, name: string) => {
    state.index = state.list.findIndex((item) => item.name === name);
  },
  approve: (state:StateT) => {
    state.isApproved = true;
  },
};

export default mutations;
