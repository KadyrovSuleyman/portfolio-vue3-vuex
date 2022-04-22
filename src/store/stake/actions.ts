/* eslint-disable no-param-reassign */
import { ActionContext, ActionTree } from 'vuex';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  stake: (store: ActionContext<StateT, any>) => {
    store.commit('stake');

    store.state.from = new Date();
    store.state.to.setDate(store.state.to.getDate() + store.rootGetters['tariff/period']);

    store.state.amountMin = store.rootGetters['tariff/amountMin'];
    store.state.amountMax = store.rootGetters['tariff/amountMax'];
  },

  replenish: (store: ActionContext<StateT, any>, value: number) => {
    store.commit('replenish', value);
  },
};

export default actions;
