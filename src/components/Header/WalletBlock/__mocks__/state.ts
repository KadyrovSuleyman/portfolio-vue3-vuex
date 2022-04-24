import { Store } from 'vuex';

export interface StateT {
  isWalletConnect: boolean,
  sendRequest: () => Promise<any>,
}

export const adaptState = (store: Store<any>) => ({
  ...store.state,
});
