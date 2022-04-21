import MODAL from '@/store/modal/types';
/* eslint-disable no-param-reassign */
import { Store } from 'vuex';

export const adapt = (store: Store<any>) => ({
  ...store.state,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.state.isShown = false;
};

export const generateReplenishConfirmHandler = (store: Store<any>) => () => {
  store.state.replenishCount += 1;
};
