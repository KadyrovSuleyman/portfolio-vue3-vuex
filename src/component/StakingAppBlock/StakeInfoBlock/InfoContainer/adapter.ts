import { Store } from 'vuex';

export interface StateT {
  From: string,
  To: string,
  Staked: string,
  APY: string,
}

const adapt = (store: Store<any>): StateT => ({
  From: store.getters['stake/from'],
  To: store.getters['stake/to'],
  Staked: `${store.state.stake.staked} TKN`,
  APY: `${store.state.stake.apy}%`,
});

export default adapt;
