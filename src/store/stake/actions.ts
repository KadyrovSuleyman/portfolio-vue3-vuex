/* eslint-disable no-param-reassign */
import { ActionContext, ActionTree } from 'vuex';
// import { setTimer } from './date';
import { StateT } from './state';

const actions: ActionTree<StateT, any> = {
  stake: (store: ActionContext<StateT, any>) => {
    store.commit('stake');

    store.state.from = new Date();
    store.state.to = new Date(Number(store.state.from));

    store.state.to.setDate(store.state.from.getDate() + store.rootGetters['tariff/period']);

    store.state.amountMin = store.rootGetters['tariff/amountMin'];
    store.state.amountMax = store.rootGetters['tariff/amountMax'];

    store.state.restakeCountdown = Number(store.state.to) - Number(store.state.from);

    let timerId = setTimeout(function tick() {
      timerId = setTimeout(tick, 1000);
      store.state.restakeCountdown -= 1000;
      if (store.state.restakeCountdown <= 0) {
        store.state.restakeCountdown = 0;
        clearTimeout(timerId);
      }
    }, 1000);
  },

  unstake: (store: ActionContext<StateT, any>) => {
    store.commit('unstake');

    store.state.inputValue = '';
    store.state.staked = 0;
    store.state.apy = 100;
    store.state.from = new Date();
    store.state.to = new Date();
    store.state.amountMax = 0;
    store.state.amountMin = 0;
    store.state.restakeCountdown = 0;

    store.rootState.tariff.index = -1;
  },

  restake: (store: ActionContext<StateT, any>) => {
    store.commit('stake');

    const prevPeriod = Number(store.state.to) - Number(store.state.from);
    store.state.from = new Date(Number(store.state.to));
    store.state.to = new Date(Number(store.state.from) + prevPeriod);

    store.state.amountMin = store.rootGetters['tariff/amountMin'];
    store.state.amountMax = store.rootGetters['tariff/amountMax'];

    store.state.restakeCountdown = Number(store.state.to) - Number(store.state.from);

    let timerId = setTimeout(function tick() {
      timerId = setTimeout(tick, 1000);
      store.state.restakeCountdown -= 1000;
      if (store.state.restakeCountdown <= 0) {
        store.state.restakeCountdown = 0;
        clearTimeout(timerId);
      }
    }, 1000);
  },

  replenish: (store: ActionContext<StateT, any>, value: number) => {
    store.commit('replenish', value);
  },
};

export default actions;
