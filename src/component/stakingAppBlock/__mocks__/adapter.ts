import MODAL from '@/store/modal/types';
import { ref } from 'vue';
import { Store } from 'vuex';

export const isWalletApproved = ref<boolean>(true);
export const isStaked = ref<boolean>(true);

export const adapt = (store: Store<any>) => ({
  ...store.state,
});

export const generateViewContractClickHandler = (store: Store<any>) => () => {
  store.dispatch('modal/show', MODAL.transactionConfirmed);
};
