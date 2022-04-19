import { ref } from 'vue';
import { Store } from 'vuex';

const isWalletConnect = ref(true);

export const adapt = (store: Store<any>) => ({
  // isWalletConnect: store.state.connect,

  isWalletConnect: isWalletConnect.value,
});

export const generateShowConnectWalletModal = (store: Store<any>) => () => {
  store.commit('showConnectWallet');
};
