import { MutationTree } from 'vuex';
import { StateT } from './state';
import { TariffT } from './types.d';

const mutations: MutationTree<StateT> = {
  'load-list': (state: StateT, list: TariffT[]) => {
    state.list = list;
  },
  select: (state: StateT, period: number) => {
    const newIndex = state.list.findIndex((item) => item.period === period);
    state.index = state.index === newIndex ? -1 : newIndex;
  },
};

export default mutations;
