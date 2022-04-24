import { ComputedRef } from 'vue';
import { StateT } from './state';

const createViewContractClickHandler = (state: ComputedRef<StateT>) => () => {
  state.value.viewContract();
};

export default createViewContractClickHandler;
