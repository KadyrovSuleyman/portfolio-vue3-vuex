import { ref } from 'vue';
import { Store } from 'vuex';

export const isWalletApproved = ref<boolean>(true);
export const isStaked = ref<boolean>(true);

const adapt = (store: Store<any>) => ({
  // isWalletApproved: store.state.isWalletApproved,
  // isStaked: store.state.isStaked,

  isWalletApproved: isWalletApproved.value,
  isStaked: isStaked.value,
});
export default adapt;
