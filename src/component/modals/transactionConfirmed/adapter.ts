/* eslint-disable no-param-reassign */
import { ref } from 'vue';
import { Store } from 'vuex';

const isShown = ref(false);

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modalsShown.transactionConfirmed,

  // isShown: isShown.value,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.state.modalsShown.transactionConfirmed = false;

  // isShown.value = false;
};

export const notificationClickHandler = () => {
  console.warn('transactionConfirmed-notification clicked');
};
