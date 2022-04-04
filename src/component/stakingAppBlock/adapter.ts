import { ref } from 'vue';
import { Store } from 'vuex';

export const isWalletApproved = ref<boolean>(true);

const adapt = (store: Store<any>) => ({
  // isWalletApproved: store.state.isWalletApproved,

  isWalletApproved: isWalletApproved.value,
});
export default adapt;
