import { ref } from 'vue';
import MODAL from '@/store/modal/types';
import { Store } from 'vuex';

const isWalletConnect = ref(false);

export const adapt = (store: Store<any>) => ({
  isWalletConnect: store.getters['wallet/isConnected'],

  // isWalletConnect: isWalletConnect.value,
});

export const generateShowConnectWalletModal = (store: Store<any>) => () => {
  store.commit('modal/show', MODAL.connectWallet);
};
