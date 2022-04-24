import { Store } from 'vuex';

export interface StateT {
  isWalletConnect: boolean,
  sendRequest: () => Promise<any>,
}

export const adapt = (store: Store<any>) => ({
  isWalletConnect: store.getters['wallet/isConnected'],
  sendRequest: () => store.dispatch('waiting/connectWallet'),
});
