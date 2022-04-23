import { ActionContext, ActionTree } from 'vuex';
import { StateT } from './state';
import { WalletT } from './types.d';
import account from '../account/__mocks__/account';

const actions: ActionTree<StateT, any> = {
  'load-list': (store: ActionContext<StateT, any>, list: WalletT[]) => {
    store.commit('load-list', list);
  },

  select: (store: ActionContext<StateT, any>, name: string) => {
    store.commit('select', name);
    store.dispatch('account/load', account, { root: true });
  },

  approve: (store: ActionContext<StateT, any>) => {
    store.commit('approve');
  },
};

export default actions;
