import { ActionContext, ActionTree, Store } from 'vuex';
import { StateT } from './state';
import { WalletT } from './types.d';

const actions: ActionTree<StateT, any> = {
  'load-list': (store: ActionContext<StateT, any>, list: WalletT[]) => {
    store.commit('load-list', list);
  },

  select: (store: ActionContext<StateT, any>, name: string) => {
    store.commit('select', name);

    store.dispatch('account/load', {
      address: 'scum',
      balance: {
        binance: 1.234,
        ethereum: 2.123,
      },
    }, { root: true });
  },

  approve: (store: ActionContext<StateT, any>) => {
    store.commit('approve');
  },
};

export default actions;
