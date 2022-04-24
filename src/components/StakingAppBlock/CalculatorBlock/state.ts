import { Store } from 'vuex';

export interface StateT {
  isWalletConnected: boolean,
  isWalletApproved: boolean,
  isStaked: boolean,
}

const adaptState = (store: Store<any>): StateT => ({
  isWalletConnected: store.getters['wallet/isConnected'],
  isWalletApproved: store.state.wallet.isApproved,
  isStaked: store.state.stake.isStaked,
});

export default adaptState;
