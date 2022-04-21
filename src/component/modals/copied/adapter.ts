/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
import MODAL from '@/store/modal/types';

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modal.copied,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.dispatch('modal/hide', MODAL.copied);
};

export const generateNotificationClickHandler = (store: Store<any>) => () => {
  console.warn('copied-notification clicked');

  store.dispatch('modal/hide', MODAL.copied);
};
