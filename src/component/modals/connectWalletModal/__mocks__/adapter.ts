/* eslint-disable no-param-reassign */
import { Store } from 'vuex';

export const adapt = (store: Store<any>) => ({
  ...store.state,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.state.isShown = false;
};
