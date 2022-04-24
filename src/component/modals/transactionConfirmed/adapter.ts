/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
import MODAL from '@/store/modal/types';

export interface StateT {
  isShown: boolean,
  hide: () => Promise<any>,
}

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modal.transactionConfirmed,
  hide: () => store.dispatch('modal/hide', MODAL.transactionConfirmed),
});
