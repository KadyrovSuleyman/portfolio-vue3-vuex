import { ComputedRef } from 'vue';
import { StateT } from './adapter';

export const createCloseHandler = (state: ComputedRef<StateT>) => () => {
  state.value.hide();
};

export const createNotificationClickHandler = (state: ComputedRef<StateT>) => () => {
  console.warn('transactionConfirmed-notification clicked');
  state.value.hide();
};
