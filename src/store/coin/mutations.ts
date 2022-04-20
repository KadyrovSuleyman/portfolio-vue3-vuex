import { MutationTree } from 'vuex';
import { StateT } from './state';
import { CoinT } from './types.d';

const mutations: MutationTree<StateT> = {
  'load-list': (state: StateT, list: CoinT[]) => {
    state.list = list;
  },
  select: (state: StateT, name: string) => {
    state.index = state.list.findIndex((item) => item.name === name);
  },
};

export default mutations;
