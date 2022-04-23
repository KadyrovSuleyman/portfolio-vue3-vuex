<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vuejs-accessibility/form-control-has-label */

import { formateClassName } from '@/module/bem/index';
import { computed, ref, defineExpose } from 'vue';

import propsObj from '../propsObj';

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

  disabled: Boolean,
  placeholder: String,
  type: String,
});

const classNames = computed(() => {
  const {
    mods, block, elem, text, onInput, onKeyup, placeholder, ...filtredProps
  } = props;

  return formateClassName(block, elem || 'input', {
    ...filtredProps,
    ...mods,
  });
});

const element = ref(null);
defineExpose({
  element,
});

</script>

<template>
  <input :value="text" @keyup="onKeyup" @input="onInput" :type="props.type" ref="element"
    :class="classNames" :placeholder="props.placeholder" :disabled="props.disabled" >
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=input] {
    @include default;
  }
</style>
