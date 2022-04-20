import { MODAL } from '@/store/modal/state';
import { ref } from 'vue';
import { Store } from 'vuex';

export const isWalletApproved = ref<boolean>(true);
export const isStaked = ref<boolean>(true);

export const adapt = (store: Store<any>) => ({
  // isWalletApproved: store.state.isWalletApproved,
  // isStaked: store.state.isStaked,

  isWalletApproved: isWalletApproved.value,
  isStaked: isStaked.value,
});

export const generateViewContractClickHandler = (store: Store<any>) => () => {
  store.commit('modal/show', MODAL.transactionConfirmed);
};
