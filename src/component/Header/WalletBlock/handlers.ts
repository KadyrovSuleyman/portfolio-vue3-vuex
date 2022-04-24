import { ComputedRef } from 'vue';
import { StateT } from './adapter';

const createShowConnectWalletModal = (state: ComputedRef<StateT>) => () => {
  state.value.sendRequest();
};

export default createShowConnectWalletModal;
