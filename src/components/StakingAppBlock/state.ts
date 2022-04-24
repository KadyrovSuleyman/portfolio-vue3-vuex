import { Store } from 'vuex';

export interface StateT {
  isWalletApproved: boolean,
  isStaked: boolean,
  viewContract: () => void,
}

export const adaptState = (store: Store<any>): StateT => ({
  isWalletApproved: store.state.wallet.isApproved,
  isStaked: store.state.stake.isStaked,
  viewContract: () => store.commit('stake/mockCountdown', 3000),
});
