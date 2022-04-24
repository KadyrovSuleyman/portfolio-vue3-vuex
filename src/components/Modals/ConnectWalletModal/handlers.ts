import { ComputedRef } from 'vue';
import { StateT } from './state';

const createCloseHandler = (state: ComputedRef<StateT>) => () => {
  state.value.hide();
};

export default createCloseHandler;
