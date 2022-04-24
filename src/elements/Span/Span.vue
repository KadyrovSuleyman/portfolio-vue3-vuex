<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { computed } from 'vue';

import propsObj from '../propsObj';

type OnClickHandlerT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });

const classNames = computed(() => {
  const {
    mods, block, elem, ...filtredProps
  } = props;

  return formateClassName(block, elem || 'span', {
    ...filtredProps,
    ...mods,
  });
});

</script>

<template>
  <span :class="classNames">
    <slot></slot>
  </span>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=span] {
    @include default;
  }
</style>
