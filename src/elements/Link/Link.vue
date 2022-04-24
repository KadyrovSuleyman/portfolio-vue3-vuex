<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { computed } from 'vue';

import propsObj from '../propsObj';

type OnClickHandlerT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  URL: String,
  onClick: {
    type: Function,
    default: (): OnClickHandlerT => () => ({}),
  },
});

const classNames = computed(() => {
  const {
    mods, block, elem, onClick, URL, ...filtredProps
  } = props;

  return formateClassName(block, elem || 'link', {
    ...filtredProps,
    ...mods,
  });
});
</script>

<template>
  <a :href="URL || '#'" @click="onClick" :class="classNames">

    <slot></slot>
  </a>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=link] {
    @include default;
  }
</style>
