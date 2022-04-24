/* eslint-disable no-param-reassign */
import MODAL from '@/store/modal/types';
import { ref } from 'vue';
import { Store } from 'vuex';

export const value = ref('');

export interface StateT {
  isShown: boolean,
  maxAmount: number,
  availableAmount: number,

  disabled: boolean,

  value: string,
  setValue: (newValue: string) => void,

  hide: () => Promise<any>,
  replenish: () => Promise<any>,
}

export const adaptState = (store: Store<any>): StateT => ({
  isShown: store.state.modal.replenish,
  maxAmount: store.state.stake.amountMax,
  availableAmount: store.getters['stake/replenishMax'],

  disabled: (
    Number(value.value) > store.getters['stake/replenishMax']
    || Number(value.value) <= 0
  ),

  value: value.value,
  setValue: (newValue: string) => { value.value = newValue; },

  hide: () => store.dispatch('modal/hide', MODAL.replenish),
  replenish: () => store.dispatch('waiting/replenish', Number(value.value)),
});
