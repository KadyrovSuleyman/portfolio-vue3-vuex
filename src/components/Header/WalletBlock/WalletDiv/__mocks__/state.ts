import { Store } from 'vuex';

export interface StateT {
  address: string,
  balance: string,
  coinName: string,
  coinLink: string,
  coinAbbreviation: string,

  showModal: () => Promise<any>,
}

export const adaptState = (store: Store<any>) => ({
  ...store.state,
});

export default adaptState;
