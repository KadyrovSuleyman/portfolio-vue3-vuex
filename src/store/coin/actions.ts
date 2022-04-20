import { ActionContext, ActionTree } from 'vuex';
import { StateT } from './state';
import { CoinT } from './types.d';

const actions: ActionTree<StateT, any> = {
  'load-list': (store: ActionContext<StateT, any>, list: CoinT[]) => {
    store.commit('load-list', list);
  },

  select: (store: ActionContext<StateT, any>, name: string) => {
    store.commit('select', name);
  },
};

export default actions;
