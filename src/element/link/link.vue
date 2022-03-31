<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { defineProps, reactive } from 'vue';

import ModsI from '../propsObj';

interface PropsI extends ModsI {
  block?: string,
  elem?: string,
  mods?: Record<string, undefined>,

  URL?: string,
}
const props = defineProps<PropsI>();

const {
  mods: _mods, block: _block, elem: _elem, ...filtredProps
} = reactive(props);

</script>

<template>
  <a :href="URL || '#'" :class="formateClassName(block, elem || 'link', {
    ...filtredProps,
    ...mods,
  })">

    <slot></slot>
  </a>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=link] {
    @include default;
  }
</style>
