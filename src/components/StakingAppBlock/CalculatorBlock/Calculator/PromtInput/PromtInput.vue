<script setup lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */

import { computed, defineExpose, ref } from 'vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';
import Input from '@/elements/Input/Input.vue';
import Span from '@/elements/Span/Span.vue';

type CallbackFuncT = (payload: Event) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  text: String,
  onInput: {
    type: Function,
    default: (): CallbackFuncT => () => ({}),
  },
  onKeyup: {
    type: Function,
    default: (): CallbackFuncT => () => ({}),
  },
  placeholder: String,

  correct: String,
  promtText: String,
  disabled: Boolean,
});
const comp = computed(() => ({ elem: props.elem || 'promtInput' }));

const input = ref(null);
defineExpose({
  input,
});
</script>

<template>
  <Div :block="props.block" :elem="comp.elem"
    :mods="{ ...props.mods, correct: props.correct, disabled: props.disabled }"
  >

    <Input :block="comp.elem" :text="props.text" :onInput="props.onInput" ref="input"
      :onKeyup="props.onKeyup" :mods="{ correct: props.correct } " :disabled="props.disabled"
    />

    <Span v-if="props.correct === 'false'" :block="comp.elem"
      :mods="{ correct: props.correct }"
    >
      {{ props.promtText }}
    </Span>

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
