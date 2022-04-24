/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
import MODAL from '@/store/modal/types';

export interface StateT {
  isShown: boolean,
  hide: () => Promise<any>,
}

export const adapt = (store: Store<any>): StateT => ({
  isShown: store.state.modal.copied,
  hide: () => store.dispatch('modal/hide', MODAL.copied),
});
