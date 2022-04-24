/* eslint-disable no-param-reassign */
import { Ref, watch } from 'vue';

export const inputValueWatcher = (state: Ref<any>) => watch(state, () => {
  if (state.value.disabled) {
    state.value.setText('');
  }

  if (state.value.maxValue < Number(state.value.text)) {
    state.value.setText(String(state.value.maxValue));
  }
});

export default inputValueWatcher;
