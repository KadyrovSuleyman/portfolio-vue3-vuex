import { Store } from 'vuex';

export interface StateT {
  isWalletConnected: boolean,
  isWalletApproved: boolean,
  isStaked: boolean,
  isReplenishAvailable: boolean,
  isRestakeAvailable: boolean,
  restakeCountdown: string,

  isWaiting: boolean,

  disabled: boolean,

  hidden: boolean,
}

const adaptState = (store: Store<any>): StateT => ({
  isWalletConnected: store.getters['wallet/isConnected'],
  isWalletApproved: store.state.wallet.isApproved,
  isStaked: store.state.stake.isStaked,
  isReplenishAvailable: store.getters['stake/isReplenishAllowed'],
  isRestakeAvailable: store.getters['stake/isRestakeAllowed'],
  restakeCountdown: store.getters['stake/countdown'],

  isWaiting: (
    store.state.waiting.connectWallet
    || store.state.waiting.approveWallet
    || store.state.waiting.stake
    || store.state.waiting.restake
    || store.state.waiting.unstake
  ),

  disabled: !(
    !store.getters['wallet/isConnected']
    || !store.state.wallet.isApproved

    || (
      store.getters['stake/isAllowed']
      && store.getters['stake/isInputValid']
    )

    || store.getters['stake/isReplenishAllowed']

    || store.getters['stake/isRestakeAllowed']
  ),

  hidden: (
    store.state.stake.isStaked
    && (
      !store.getters['stake/isReplenishAllowed']
      && !store.getters['stake/isRestakeAllowed']
    )
  ),
});

export default adaptState;
