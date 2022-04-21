import { ref } from 'vue';
import { Store } from 'vuex';

// export const maxValue = ref<number>(1000);
// export const period = ref<string>('30 days');
// export const rewardCalcParam = ref<number>(0.4);

// ===========================
const adapt = (store: Store<any>) => ({
  maxValue: store.getters['tariff/amountMax'],
  minValue: store.getters['tariff/amountMin'],
  period: store.getters['tariff/period'],
  apy: store.getters['tariff/apy'],

  // maxValue: maxValue.value,
  // period: period.value,
  // rewardCalcParam: rewardCalcParam.value,

  disabled:
    store.getters['wallet/isConnected']
    && store.state.wallet.isApproved
    && !store.state.stake.isStaked
    && store.state.tariff.index === -1
  ,
});

export default adapt;
