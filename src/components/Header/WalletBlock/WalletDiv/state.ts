import MODAL from '@/store/modal/types';
import { Store } from 'vuex';

export interface StateT {
  address: string,
  balance: string,
  coinName: string,
  coinLink: string,
  coinAbbreviation: string,

  showModal: () => Promise<any>,
}

export const adaptState = (store: Store<any>): StateT => ({
  address: store.state.account.address,
  balance: store.getters['account/balance'],
  coinName: store.getters['coin/name'],
  coinLink: store.getters['coin/icon'],
  coinAbbreviation: store.getters['coin/abbreviation'],

  showModal: () => store.dispatch('modal/show', MODAL.copied),
});
