import { Store } from 'vuex';

// ===========================
const adapt = (store: Store<any>) => ({
  From: store.getters['stake/from'],
  To: store.getters['stake/to'],
  Staked: `${store.state.stake.staked} TKN`,
  APY: `${store.state.stake.apy}%`,
});

export default adapt;
