/* eslint-disable no-param-reassign */
import { ref } from 'vue';
import { Store } from 'vuex';
import MODAL from '@/store/modal/types';

const isShown = ref(false);

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modal.transactionConfirmed,

  // isShown: isShown.value,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.commit('modal/hide', MODAL.transactionConfirmed);

  // isShown.value = false;
};

export const generateNotificationClickHandler = (store: Store<any>) => () => {
  console.warn('transactionConfirmed-notification clicked');

  store.commit('modal/hide', MODAL.transactionConfirmed);

  // isShown.value = false;
};
