import { Store } from 'vuex';

const adaptState = (store: Store<any>) => ({
  walletsList: store.state.wallet.list,
});
export default adaptState;
