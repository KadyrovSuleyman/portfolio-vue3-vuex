import { GetterTree } from 'vuex';
import { formateDate } from './date';
import { StateT } from './state';

const getters: GetterTree<StateT, any> = {
  isAllowed: (state: StateT, getters_: any, rootState: any, rootGetters: any) => (
    rootGetters['wallet/isConnected']
    && rootState.wallet.isApproved
    && !state.isStaked
    && rootState.tariff.index !== -1
  ),

  isInputValid: (state: StateT, getters_: any, rootState: any, rootGetters: any) => (
    state.inputValue !== ''
    && Number(state.inputValue) >= rootGetters['tariff/amountMin']
    && Number(state.inputValue) <= rootGetters['tariff/amountMax']
  ),

  reward: (state: StateT) => {
    const res = state.staked * ((state.apy / 100) - 1);
    return Math.floor(res * 1000) / 1000;
  },

  from: (state: StateT) => formateDate(state.from) || '',
  to: (state: StateT) => formateDate(state.to) || '',

  isReplenishAllowed: (state: StateT) => state.staked < state.amountMax,
  replenishMax: (state: StateT) => state.amountMax - state.staked,
};

export default getters;
