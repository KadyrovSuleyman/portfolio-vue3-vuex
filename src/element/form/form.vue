<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vuejs-accessibility/click-events-have-key-events */

import { formateClassName } from '@/module/bem/index';
import { computed } from 'vue';

import propsObj from '../propsObj';

type OnClickHandlerT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  onSubmit: {
    type: Function,
    default: (): OnClickHandlerT => () => ({}),
  },
});

const classNames = computed(() => {
  const {
    mods, block, elem, onSubmit, ...filtredProps
  } = props;

  return formateClassName(block, elem || 'div', {
    ...filtredProps,
    ...mods,
  });
});

</script>

<template>
  <form :class="classNames" @submit="onSubmit">

    <slot></slot>
  </form>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=div] {
    @include default;
  }
</style>
