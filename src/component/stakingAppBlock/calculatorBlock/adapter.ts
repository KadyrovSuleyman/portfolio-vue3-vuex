import { ref } from 'vue';
import { Store } from 'vuex';

// export const isWalletConnected = ref<boolean>(true);
// export const isWalletApproved = ref<boolean>(true);
export const isStaked = ref<boolean>(false);

// ===========================
const adapt = (store: Store<any>) => ({
  isWalletConnected: store.getters['wallet/isConnected'],
  isWalletApproved: store.state.wallet.isApproved,
  // isStaked: store.state.isStaked,

  // isWalletConnected: isWalletConnected.value,
  // isWalletApproved: isWalletApproved.value,
  isStaked: isStaked.value,
});

export default adapt;
