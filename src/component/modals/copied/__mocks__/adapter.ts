/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
import MODAL from '@/store/modal/types';

export const adapt = (store: Store<any>) => ({
  ...store.state,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.state.isShown = false;
};

export const generateNotificationClickHandler = (store: Store<any>) => () => {
  console.warn('copied-notification clicked');

  store.dispatch('modal/hide', MODAL.copied);
};
