import { ref } from 'vue';
import { Store } from 'vuex';

export const maxValue = ref<number>(1000);
export const period = ref<string>('30 days');
export const rewardCalcParam = ref<number>(0.4);

// ===========================
const adapt = (store: Store<any>) => ({
  // maxValue: store.state.maxValue,
  // period: store.state.period,
  // reward: store.state.reward,

  maxValue: maxValue.value,
  period: period.value,
  rewardCalcParam: rewardCalcParam.value,
});

export default adapt;
