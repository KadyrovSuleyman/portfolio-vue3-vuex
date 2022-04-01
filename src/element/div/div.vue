<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { computed } from 'vue';

import propsObj from '../propsObj';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });

const classNames = computed(() => {
  const {
    mods, block, elem, ...filtredProps
  } = props;

  return formateClassName(block, elem || 'div', {
    ...filtredProps,
    ...mods,
  });
});

</script>

<template>
  <div :class="classNames">

    <slot></slot>
  </div>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=div] {
    @include default;
  }
</style>
