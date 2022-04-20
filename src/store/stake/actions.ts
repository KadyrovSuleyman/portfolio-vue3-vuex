import { ActionContext, ActionTree } from 'vuex';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  stake: (store: ActionContext<StateT, any>) => {
    store.commit('stake');
  },
};

export default actions;
