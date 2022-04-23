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

  disabled: (
    Number(value.value) > store.getters['stake/replenishMax']
    || Number(value.value) <= 0
  ),
});

export const generateCloseHandler = (store: Store<any>) => async () => {
  await store.dispatch('modal/hide', MODAL.replenish);
  value.value = '';
};

export const generateReplenishConfirmHandler = (store: Store<any>) => async () => {
  await store.dispatch('waiting/replenish', Number(value.value));
  value.value = '';
};
