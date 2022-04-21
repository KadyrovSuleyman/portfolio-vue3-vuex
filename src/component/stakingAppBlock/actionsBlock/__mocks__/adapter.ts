import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  ...store.state,
});

export default adapt;
