import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  isWalletConnected: store.getters['wallet/isConnected'],
  isWalletApproved: store.state.wallet.isApproved,
  isStaked: store.state.stake.isStaked,
});

export default adapt;
