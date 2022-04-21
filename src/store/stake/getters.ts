import { GetterTree } from 'vuex';
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
};

export default getters;
