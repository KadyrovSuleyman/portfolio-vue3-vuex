import { ActionContext, ActionTree } from 'vuex';
import MODAL from '@/store/modal/types';
import { StateT } from './state';
import WAIT from './types';
import walletList from './__mocks__/walletList';
import coinList from './__mocks__/coinList';

const MOCKED_LOAD_DELAY = 1000;

const actions: ActionTree<StateT, any> = {
  connectWallet: async (store: ActionContext<StateT, any>) => {
    if (store.rootState.wallet.list.length !== 0) {
      await store.dispatch('modal/show', MODAL.connectWallet, { root: true });
      return;
    }

    store.commit('start', WAIT.connectWallet);
    const mockedLoad = async () => {
      await store.dispatch('wallet/load-list', walletList, { root: true });
      store.commit('stop', WAIT.connectWallet);
      await store.dispatch('modal/show', MODAL.connectWallet, { root: true });
    };
    setTimeout(mockedLoad, MOCKED_LOAD_DELAY);
  },

  selectWallet: (store: ActionContext<StateT, any>, name: string) => {
    store.commit('start', WAIT.selectWallet);
    const mockedLoad = async () => {
      await store.dispatch('coin/load-list', coinList, { root: true });
      store.commit('stop', WAIT.selectWallet);
      await store.dispatch('wallet/select', name, { root: true });
      await store.dispatch('modal/hide', MODAL.connectWallet, { root: true });
    };
    setTimeout(mockedLoad, 0);
  },

  approveWallet: (store: ActionContext<StateT, any>) => {
    store.commit('start', WAIT.approveWallet);
    const mockedLoad = async () => {
      store.commit('stop', WAIT.approveWallet);
      await store.dispatch('wallet/approve', null, { root: true });
    };
    setTimeout(mockedLoad, MOCKED_LOAD_DELAY);
  },

  stake: (store: ActionContext<StateT, any>) => {
    store.commit('start', WAIT.stake);
    const mockedLoad = async () => {
      store.commit('stop', WAIT.stake);
      await store.dispatch('stake/stake', null, { root: true });
      await store.dispatch('modal/show', MODAL.transactionConfirmed, { root: true });
    };
    setTimeout(mockedLoad, MOCKED_LOAD_DELAY);
  },

  replenish: (store: ActionContext<StateT, any>, value: number) => {
    store.commit('start', WAIT.replenish);
    const mockedLoad = async () => {
      store.commit('stop', WAIT.replenish);
      await store.dispatch('stake/replenish', value, { root: true });
      await store.dispatch('modal/hide', MODAL.replenish, { root: true });
      await store.dispatch('modal/show', MODAL.transactionConfirmed, { root: true });
    };
    setTimeout(mockedLoad, 0);
  },

  restake: (store: ActionContext<StateT, any>) => {
    store.commit('start', WAIT.restake);
    const mockedLoad = async () => {
      store.commit('stop', WAIT.restake);
      await store.dispatch('stake/restake', null, { root: true });
      await store.dispatch('modal/show', MODAL.transactionConfirmed, { root: true });
    };
    setTimeout(mockedLoad, MOCKED_LOAD_DELAY);
  },

  unstake: (store: ActionContext<StateT, any>) => {
    store.commit('start', WAIT.unstake);
    const mockedLoad = async () => {
      store.commit('stop', WAIT.unstake);
      await store.dispatch('stake/unstake', null, { root: true });
    };
    setTimeout(mockedLoad, MOCKED_LOAD_DELAY);
  },
};

export default actions;
