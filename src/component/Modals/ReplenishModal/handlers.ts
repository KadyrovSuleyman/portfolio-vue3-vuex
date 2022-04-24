import { ComputedRef } from 'vue';
import { StateT } from './adapter';

export const createCloseHandler = (state: ComputedRef<StateT>) => async () => {
  await state.value.hide();
  state.value.setValue('');
  console.log(state.value.value);
};

export const createReplenishConfirmHandler = (state: ComputedRef<StateT>) => async () => {
  await state.value.replenish();
  state.value.setValue('');
};
