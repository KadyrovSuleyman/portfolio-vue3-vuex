import { Store } from 'vuex';

export interface StateT {
  isWalletConnect: boolean,
  sendRequest: () => Promise<any>,
}

export const adapt = (store: Store<any>) => ({
  ...store.state,
});
