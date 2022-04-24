import { ComputedRef } from 'vue';
import { StateT } from './state';

export const createCloseHandler = (state: ComputedRef<StateT>) => () => {
  state.value.hide();
};

export const createNotificationClickHandler = (state: ComputedRef<StateT>) => () => {
  console.warn('transactionConfirmed-notification clicked');
  state.value.hide();
};
