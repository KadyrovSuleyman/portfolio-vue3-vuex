import { ComputedRef } from 'vue';
import { StateT } from './adapter';

const createViewContractClickHandler = (state: ComputedRef<StateT>) => () => {
  state.value.viewContract();
};

export default createViewContractClickHandler;
