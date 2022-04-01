import { computed } from 'vue';
import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  address: computed(() => store.state.addradsfess),
  balance: computed(() => store.state.balaasdfnce),
});

export default adapt;
