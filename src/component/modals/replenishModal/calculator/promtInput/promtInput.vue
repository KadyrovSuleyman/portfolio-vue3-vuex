<script setup lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Input from '@/element/input/input.vue';
import Span from '@/element/span/span.vue';

type OnInputFuncT = (payload: Event) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  text: String,
  onInput: {
    type: Function,
    default: (): OnInputFuncT => () => ({}),
  },
  placeholder: String,

  correct: String,
  promtText: String,
});
const comp = computed(() => ({ elem: props.elem || 'promtInput' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem"
    :mods="{ ...props.mods, correct: props.correct }"
  >

    <Input :block="comp.elem" :text="props.text" :onInput="props.onInput"
      :mods="{ correct: props.correct }" :placeholder="placeholder"
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
