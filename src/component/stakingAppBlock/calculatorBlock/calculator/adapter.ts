import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  maxValue: store.getters['tariff/amountMax'],
  minValue: store.getters['tariff/amountMin'],
  period: store.getters['tariff/period'],
  apy: store.getters['tariff/apy'],

  disabled: !store.getters['stake/isAllowed'],

  text: store.state.stake.inputValue,
  setText: (newInput: string) => store.commit('stake/input', newInput),

  reward: store.getters['stake/reward'],
});

export default adapt;
