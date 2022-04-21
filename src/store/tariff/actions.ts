/* eslint-disable no-param-reassign */
import { ActionContext, ActionTree } from 'vuex';
import { StateT } from './state';
import { TariffT } from './types.d';

const actions: ActionTree<StateT, any> = {
  'load-list': (store: ActionContext<StateT, any>, list: TariffT[]) => {
    store.commit('load-list', list);
  },

  select: (store: ActionContext<StateT, any>, period: number) => {
    store.commit('select', period);

    store.rootState.stake.apy = store.getters.apy;
  },
};

export default actions;
