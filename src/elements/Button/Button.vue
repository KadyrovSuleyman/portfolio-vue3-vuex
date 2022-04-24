<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { computed } from 'vue';

import propsObj from '../propsObj';

type OnClickHandlerT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  onClick: {
    type: Function,
    default: (): OnClickHandlerT => () => ({}),
  },
  disabled: Boolean,
});

const classNames = computed(() => {
  const {
    mods, block, elem, onClick, ...filtredProps
  } = props;

  return formateClassName(block, elem || 'button', {
    ...filtredProps,
    ...mods,
  });
});

</script>

<template>
  <button @click="onClick" :class="classNames" :disabled="props.disabled">

    <slot></slot>
  </button>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=button] {
    @include default;
  }
</style>
