import { ComputedRef } from 'vue';
import { StateT } from './adapter';

export const createCloseHandler = (state: ComputedRef<StateT>) => () => {
  state.value.hide();
  state.value.setValue('');
};

export const createReplenishConfirmHandler = (state: ComputedRef<StateT>) => () => {
  state.value.replenish();
  state.value.setValue('');
};
