import { ref } from 'vue';
import { Store } from 'vuex';

export type StateListT = { [name: string]: boolean | string };

export const isWaiting = ref<boolean>(false);

// export const isWalletConnected = ref<boolean>(true);
// export const isWalletApproved = ref<boolean>(true);

export const isStaked = ref<boolean>(true);
export const isRestakeAvailable = ref<boolean>(false);
export const isReplenishAvailable = ref<boolean>(true);

export const restakeCountdown = ref<string>('00:00:09');

// ======================================
const adapt = (store: Store<any>) => ({
  isWalletConnected: store.getters['wallet/isConnected'],
  isWalletApproved: store.state.wallet.isApproved,
  // isWaiting: store.state.isWaiting,
  // isStaked: store.state.isStaked,
  // isReplenishAvailable: store.state.isReplenishAvailable,
  // isRestakeAvailable: store.state.isRestakeAvailable,
  // restakeCountdown: store.state.restakeCountdown,

  // isWalletConnected: isWalletConnected.value,
  // isWalletApproved: isWalletApproved.value,
  isWaiting: isWaiting.value,
  isStaked: isStaked.value,
  isReplenishAvailable: isReplenishAvailable.value,
  isRestakeAvailable: isRestakeAvailable.value,
  restakeCountdown: restakeCountdown.value,
});

export default adapt;
