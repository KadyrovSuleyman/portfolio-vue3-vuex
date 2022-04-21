import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  income: store.getters['stake/reward'],
});

export default adapt;
