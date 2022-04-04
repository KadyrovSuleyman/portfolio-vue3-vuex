import { ref } from 'vue';
import { Store } from 'vuex';

export type StateListT = { [name: string]: boolean | string };

export const isWaiting = ref<boolean>(false);

export const isWalletConnected = ref<boolean>(false);
export const isWalletApproved = ref<boolean>(false);

export const isStaked = ref<boolean>(false);
export const isRestakeAvailable = ref<boolean>(false);
export const isReplenishAvailable = ref<boolean>(false);

export const restakeCountdown = ref<string>('00:00:09');

// ======================================
const adapt = (store: Store<any>) => ({
  // isWalletConnected: store.state.isWalletConnected,
  // isWalletApproved: store.state.isWalletApproved,
  // isWaiting: store.state.isWaiting,
  // isStaked: store.state.isStaked,
  // isReplenishAvailable: store.state.isReplenishAvailable,
  // isRestakeAvailable: store.state.isRestakeAvailable,
  // restakeCountdown: store.state.restakeCountdown,

  isWalletConnected: isWalletConnected.value,
  isWalletApproved: isWalletApproved.value,
  isWaiting: isWaiting.value,
  isStaked: isStaked.value,
  isReplenishAvailable: isReplenishAvailable.value,
  isRestakeAvailable: isRestakeAvailable.value,
  restakeCountdown: restakeCountdown.value,
});

export default adapt;
