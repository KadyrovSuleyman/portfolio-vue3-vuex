/* eslint-disable no-param-reassign */
import { ComputedRef } from 'vue';
import { isValidInput } from './logic';
import { StateT } from './adapter';

export const createMaxButtonClickHandler = (
  state: ComputedRef<StateT>,
  inputRef: HTMLInputElement,
) => () => {
  state.value.setValue(String(state.value.maxValue));
  inputRef.focus();
};

export const createOnInputHandler = (
  state: ComputedRef<StateT>,
) => (payload: KeyboardEvent) => {
  const target = (payload.target as HTMLInputElement);
  if (!isValidInput(target.value)) {
    target.value = state.value.value || '';
    return;
  }

  if (Number(target.value) > state.value.maxValue) {
    target.value = String(state.value.maxValue);
  }

  state.value.setValue(target.value);
};

export const createOnKeyupHandler = (
  state: ComputedRef<StateT>,
  inputRef: HTMLInputElement,
) => async (payload: KeyboardEvent) => {
  if (payload.key === 'Enter') {
    await state.value.replenish(inputRef.value);
    inputRef.value = '';
  }
};
