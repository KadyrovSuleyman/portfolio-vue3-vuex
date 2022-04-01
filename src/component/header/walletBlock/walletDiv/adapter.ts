import { computed } from 'vue';
import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  address: computed(() => store.state.address),
  balance: computed(() => store.state.balance),
});

export default adapt;
