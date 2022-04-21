import { Store } from 'vuex';
import MODAL from '@/store/modal/types';

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modal.connectWallet,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.dispatch('modal/hide', MODAL.connectWallet);
};
