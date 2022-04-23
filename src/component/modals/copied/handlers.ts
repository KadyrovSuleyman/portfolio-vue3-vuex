import { ComputedRef } from 'vue';
import { StateT } from './adapter';

const createCloseHandler = (state: ComputedRef<StateT>) => () => {
  state.value.hide();
};

export default createCloseHandler;
