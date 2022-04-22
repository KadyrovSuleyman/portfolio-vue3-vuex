import { ref } from 'vue';
import { Store } from 'vuex';

export type StateListT = { [name: string]: boolean | string };

export const isWaiting = ref<boolean>(false);

// export const isWalletConnected = ref<boolean>(true);
// export const isWalletApproved = ref<boolean>(true);

// export const isStaked = ref<boolean>(true);
export const isRestakeAvailable = ref<boolean>(false);
// export const isReplenishAvailable = ref<boolean>(true);

export const restakeCountdown = ref<string>('00:00:09');

// ======================================
const adapt = (store: Store<any>) => ({
  isWalletConnected: store.getters['wallet/isConnected'],
  isWalletApproved: store.state.wallet.isApproved,
  // isWaiting: store.state.isWaiting,
  isStaked: store.state.stake.isStaked,
  isReplenishAvailable: store.getters['stake/isReplenishAllowed'],
  isRestakeAvailable: store.getters['stake/isRestakeAllowed'],
  restakeCountdown: store.getters['stake/countdown'],

  // isWalletConnected: isWalletConnected.value,
  // isWalletApproved: isWalletApproved.value,
  isWaiting: isWaiting.value,
  // isStaked: isStaked.value,
  // isReplenishAvailable: isReplenishAvailable.value,
  // isRestakeAvailable: isRestakeAvailable.value,
  // restakeCountdown: restakeCountdown.value,

  // disabled: !(
  //   store.getters['stake/isAllowed']
  //   || store.getters['stake/isInputValid']
  // ),

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
