import { computed, ref } from 'vue';
import { Store } from 'vuex';

const address = ref('0хCb99...8EBb');
const balance = ref('0.029 BUSD');

const adapt = (store: Store<any>) => ({
  // address: computed(() => store.state.address),
  // balance: computed(() => store.state.balance),

  address: address.value,
  balance: balance.value,
});

export default adapt;
