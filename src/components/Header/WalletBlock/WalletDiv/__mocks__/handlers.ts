import { ComputedRef } from 'vue';
import { StateT } from './state';

const createCopyClickHandler = (state: ComputedRef<StateT>) => async () => {
  await state.value.showModal();
};

export default createCopyClickHandler;
