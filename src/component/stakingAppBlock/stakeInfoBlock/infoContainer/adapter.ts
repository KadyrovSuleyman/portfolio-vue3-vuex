import { ref } from 'vue';
import { Store } from 'vuex';

export const from = ref<string>('22 Jun, 14:14');
export const to = ref<string>('22 Jun, 14:17');
export const staked = ref<number>(960);
export const apy = ref<string>('129,97%');

// ===========================
const adapt = (store: Store<any>) => ({
  // from: store.state.from,
  // to: store.state.to,
  // staked: store.state.staked,
  // apy: store.state.apy,

  From: from.value,
  To: to.value,
  Staked: staked.value,
  APY: apy.value,
});

export default adapt;
