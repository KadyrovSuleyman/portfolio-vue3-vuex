import { ComputedRef } from 'vue';
import { isValidInput } from './logic';
import { StateT } from './state';

export const createMaxButtonClickHandler = (
  state: ComputedRef<StateT>,
  inputRef: HTMLInputElement,
) => () => {
  state.value.setText(String(state.value.maxValue));
  inputRef.focus();
};

export const createOnInputHandler = (
  state: ComputedRef<StateT>,
) => (payload: KeyboardEvent) => {
  const target = (payload.target as HTMLInputElement);

  if (!isValidInput(target.value)) {
    target.value = state.value.text;
    return;
  }

  if (Number(target.value) > state.value.maxValue) {
    target.value = String(state.value.maxValue);
  }

  state.value.setText(target.value);
};

export const createOnKeyupHandler = (
  state: ComputedRef<StateT>,
) => (payload: KeyboardEvent) => {
  if (payload.key === 'Enter') {
    state.value.submit();
  }
};
