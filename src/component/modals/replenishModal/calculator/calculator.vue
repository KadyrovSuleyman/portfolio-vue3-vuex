<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import { useStore } from 'vuex';
import PromtInput from './promtInput/promtInput.vue';
import {
  isValidInput, validate, correctState,
} from './logic';
import adapt from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  value: String,
  setValue: {
    type: Function,
    default: () => ({}),
  },
});
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const errorText = computed(() => validate(props.value || ''));
const correct = computed(() => correctState(props.value || ''));

const store = useStore();
const state = computed(() => adapt(store));

const onInput = (payload: KeyboardEvent) => {
  const target = (payload.target as HTMLInputElement);
  if (!isValidInput(target.value)) {
    target.value = props.value || '';
    return;
  }

  if (Number(target.value) > state.value.maxValue) {
    target.value = String(state.value.maxValue);
  }

  props.setValue(target.value);
};

const onButtonClick = () => {
  props.setValue(String(state.value.maxValue));
};

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <PromtInput :block="comp.elem" :promtText="errorText" :correct="correct"
      :text="props.value" :onInput="onInput" :placeholder="'0'"
    />
    <Button :block="comp.elem" :onClick="onButtonClick">Max</Button>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
