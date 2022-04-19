/* eslint-disable no-param-reassign */
import { ref } from 'vue';
import { Store } from 'vuex';

const isShown = ref(false);
const maxAmount = ref(1000);
const availableAmount = ref(40);

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modalsShown.replenish,
  // maxAmount: store.state.maxAmount,
  // availableAmount: store.state.availableAmount,

  // isShown: isShown.value,
  maxAmount: maxAmount.value,
  availableAmount: availableAmount.value,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.state.modalsShown.replenish = false;

  // isShown.value = false;
};

export const generateReplenishConfirmHandler = (store: Store<any>) => () => {
  store.state.modalsShown.replenish = false;

  // isShown.value = false;
};
