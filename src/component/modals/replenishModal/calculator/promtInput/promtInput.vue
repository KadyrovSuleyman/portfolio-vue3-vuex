<script setup lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */

import { computed, ref, defineExpose } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Input from '@/element/input/input.vue';
import Span from '@/element/span/span.vue';

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
});
const comp = computed(() => ({ elem: props.elem || 'promtInput' }));

const input = ref(null);
defineExpose({
  input,
});

</script>

<template>
  <Div :block="props.block" :elem="comp.elem"
    :mods="{ ...props.mods, correct: props.correct }"
  >

    <Input :block="comp.elem" :text="props.text" :onInput="props.onInput" :onKeyup="props.onKeyup"
      :mods="{ correct: props.correct }" :placeholder="placeholder" ref="input"
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
