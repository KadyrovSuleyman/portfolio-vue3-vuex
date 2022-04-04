<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
/* eslint-disable vue/no-mutating-props */

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

  placeholder: String,
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
  <input :value="text" @input="onInput"
    :class="classNames" :placeholder="props.placeholder" >
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=input] {
    @include default;
  }
</style>
