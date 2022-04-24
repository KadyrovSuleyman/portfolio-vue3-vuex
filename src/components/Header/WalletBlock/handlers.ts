import { ComputedRef } from 'vue';
import { StateT } from './state';

const createShowConnectWalletModal = (state: ComputedRef<StateT>) => () => {
  state.value.sendRequest();
};

export default createShowConnectWalletModal;
