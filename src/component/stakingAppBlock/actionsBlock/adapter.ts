import { ref } from 'vue';
import { Store } from 'vuex';

export type StateListT = { [name: string]: boolean | string };

export const isWaiting = ref<boolean>(false);

const adapt = (store: Store<any>) => ({
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

export default adapt;
