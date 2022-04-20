import { TariffItemT } from '@/component/stakingAppBlock/tariffsBlock/adapter';
import { createLogger, createStore } from 'vuex';
import types from './mutation-types';
import modal from './modal';

export default createStore<any>({
  modules: {
    modal,
  },

  state: {
    isWalletConnected: true,
    isWalletApproved: false,
    isWaiting: false,
    isStaked: false,
    isReplenishAvailable: false,
    isRestakeAvailable: false,
    restakeCountdown: '00:00:09',

    address: 'asdfasdf',
  },
  mutations: {
    changee: (state, obj: { [name: string]: boolean | string }) => {
      Object.keys(obj).forEach((index) => {
        state[index] = obj[index];
      });
    },
  },
});
