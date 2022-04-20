/* eslint-disable no-param-reassign */
import { ref } from 'vue';
import { Store } from 'vuex';
import { MODAL } from '@/store/modal/state';

const isShown = ref(false);

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modal.connectWallet,

  // isShown: isShown.value,
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.commit('modal/hide', MODAL.connectWallet);

  // isShown.value = false;
};
