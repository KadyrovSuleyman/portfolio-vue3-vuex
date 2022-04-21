import MODAL from '@/store/modal/types';
import { Store } from 'vuex';

export const adapt = (store: Store<any>) => ({
  ...store.state,
});

export const generateCopyClickHandler = (store: Store<any>) => () => {
  const state = adapt(store);

  navigator.clipboard.writeText(state.address)
    .then(() => { store.dispatch('modal/show', MODAL.copied); });

  store.dispatch('coin/select', 'ethereum');
};

export default adapt;
