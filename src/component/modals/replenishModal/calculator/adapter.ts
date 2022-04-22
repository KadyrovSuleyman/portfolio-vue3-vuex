import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  maxValue: store.getters['stake/replenishMax'],
  replenish: (input: string) => store.dispatch('stake/replenish', Number(input)),
});

export default adapt;
