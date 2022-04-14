import { TariffItemT } from '@/component/stakingAppBlock/tariffsBlock/adapter';
import { createLogger, createStore } from 'vuex';
import types from './mutation-types';

export default createStore<any>({
  state: {
    isWalletConnected: true,
    isWalletApproved: false,
    isWaiting: false,
    isStaked: false,
    isReplenishAvailable: false,
    isRestakeAvailable: false,
    restakeCountdown: '00:00:09',

    modalsShown: {
      connectWallet: false,
      transactionConfirmed: false,
      replenish: false,
    },
  },
  mutations: {
    changee: (state, obj: { [name: string]: boolean | string }) => {
      Object.keys(obj).forEach((index) => {
        state[index] = obj[index];
      });
    },

    showConnectWallet: (state) => { state.modalsShown.connectWallet = true; },
    showTransactionConfirmed: (state) => { state.modalsShown.transactionConfirmed = true; },
  },
});
