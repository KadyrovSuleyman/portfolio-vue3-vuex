import { computed, ref } from 'vue';
import { Store } from 'vuex';

const isWalletConnect = ref(true);

const adapt = (store: Store<any>) => ({
  // isWalletConnect: computed(() => store.state.connect),
  isWalletConnect: isWalletConnect.value,
});

export default adapt;
