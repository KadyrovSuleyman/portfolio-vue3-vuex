import { ActionContext, ActionTree } from 'vuex';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  load: (store: ActionContext<StateT, any>, newState: StateT) => {
    store.commit('load', newState);
  },
};

export default actions;
