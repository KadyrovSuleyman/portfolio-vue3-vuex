/* eslint-disable no-param-reassign */
import { Ref, watch } from 'vue';

export const inputValueWatcher = (state: Ref<any>, target: Ref<string>) => watch(state, () => {
  if (state.value.disabled) {
    target.value = '';
  }

  if (state.value.maxValue < target.value) {
    target.value = String(state.value.maxValue);
  }
});

export default inputValueWatcher;
