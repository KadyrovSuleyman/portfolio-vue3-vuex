/* eslint-disable no-param-reassign */
import { Store } from 'vuex';

const generateCloseHandler = (store: Store<any>) => () => {
  store.state.modalsShown.connectWallet = false;
};

export default generateCloseHandler;
