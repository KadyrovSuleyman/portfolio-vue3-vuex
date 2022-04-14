import { ref } from 'vue';
import { Store } from 'vuex';

export const income = ref<number>(26.6666);

// ===========================
const adapt = (store: Store<any>) => ({
  // income: store.state.income,

  income: income.value,
});

export default adapt;
