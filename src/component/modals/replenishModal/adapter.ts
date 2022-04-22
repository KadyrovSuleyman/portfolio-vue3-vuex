/* eslint-disable no-param-reassign */
import MODAL from '@/store/modal/types';
import { ref } from 'vue';
import { Store } from 'vuex';

export const value = ref('');
export const setValue = (newValue: string) => { value.value = newValue; };

export const adapt = (store: Store<any>) => ({
  isShown: store.state.modal.replenish,
  maxAmount: store.state.stake.amountMax,
  availableAmount: store.getters['stake/replenishMax'],
});

export const generateCloseHandler = (store: Store<any>) => () => {
  store.dispatch('modal/hide', MODAL.replenish)
    .then(() => { value.value = ''; });
};

export const generateReplenishConfirmHandler = (store: Store<any>) => () => {
  store.dispatch('stake/replenish', Number(value.value))
    .then(() => store.dispatch('modal/hide', MODAL.replenish))
    .then(() => { value.value = ''; });
};
