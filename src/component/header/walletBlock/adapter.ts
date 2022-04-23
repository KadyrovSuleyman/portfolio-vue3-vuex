import MODAL from '@/store/modal/types';
import { Store } from 'vuex';

export const adapt = (store: Store<any>) => ({
  isWalletConnect: store.getters['wallet/isConnected'],
});

export const generateShowConnectWalletModal = (store: Store<any>) => () => {
  // store.dispatch('modal/show', MODAL.connectWallet);
  store.dispatch('waiting/connectWallet');
};
