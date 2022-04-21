<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vuejs-accessibility/form-control-has-label */

import { formateClassName } from '@/module/bem/index';
import { computed, Ref } from 'vue';

import propsObj from '../propsObj';

type OnInputFuncT = (payload: Event) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  text: String,
  onInput: {
    type: Function,
    default: (): OnInputFuncT => () => ({}),
  },

  disabled: Boolean,
  placeholder: String,
  type: String,
});

const classNames = computed(() => {
  const {
    mods, block, elem, text, onInput, placeholder, ...filtredProps
  } = props;

  return formateClassName(block, elem || 'input', {
    ...filtredProps,
    ...mods,
  });
});

</script>

<template>
  <input :value="text" @input="onInput" :type="props.type"
    :class="classNames" :placeholder="props.placeholder" :disabled="props.disabled" >
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=input] {
    @include default;
  }
</style>
