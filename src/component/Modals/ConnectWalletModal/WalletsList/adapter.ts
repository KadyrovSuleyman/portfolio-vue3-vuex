import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  walletsList: store.state.wallet.list,
});
export default adapt;
