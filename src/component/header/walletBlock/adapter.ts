import { computed } from 'vue';
import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  isWalletConnect: computed(() => store.state.connect),
});

export default adapt;
