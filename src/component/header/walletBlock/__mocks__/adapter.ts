import MODAL from '@/store/modal/types';
import { Store } from 'vuex';

export const adapt = (store: Store<any>) => ({
  isWalletConnect: store.state.connect,
});

export const generateShowConnectWalletModal = (store: Store<any>) => () => {
  store.dispatch('modal/show', MODAL.connectWallet);
};
