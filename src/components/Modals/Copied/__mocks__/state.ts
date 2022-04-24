/* eslint-disable no-param-reassign */
import { Store } from 'vuex';

export interface StateT {
  isShown: boolean,
  hide: () => Promise<any>,
}

export const adaptState = (store: Store<any>): StateT => ({
  ...store.state,
});
