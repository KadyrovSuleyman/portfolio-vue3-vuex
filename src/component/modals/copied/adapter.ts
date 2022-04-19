/* eslint-disable no-param-reassign */
import { ref } from 'vue';
import { Store } from 'vuex';

const isShown = ref(false);

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modalsShown.copied,

  // isShown: isShown.value,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.state.modalsShown.copied = false;

  // isShown.value = false;
};

export const generateNotificationClickHandler = (store: Store<any>) => () => {
  console.warn('copied-notification clicked');

  store.state.modalsShown.copied = false;

  // isShown.value = false;
};
