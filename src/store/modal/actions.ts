import { ActionContext, ActionTree, Store } from 'vuex';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  show: (store: ActionContext<StateT, any>, name: string) => {
    store.commit('show', name);
  },

  hide: (store: ActionContext<StateT, any>, name: string) => {
    store.commit('hide', name);
  },
};

export default actions;
