<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { defineProps, reactive } from 'vue';

import ModsI from '../ModsI';

interface PropsI extends ModsI {
  block?: string,
  elem?: string,
  mods?: Record<string, unknown>,
}
const props = defineProps<PropsI>();

const {
  mods: _mods, block: _block, elem: _elem, ...filtredProps
} = reactive(props);

</script>

<template>
  <div :class="formateClassName(block, elem || 'div', {
    ...filtredProps,
    ...mods,
  })">

    <slot></slot>
  </div>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=div] {
    @include default;
  }
</style>
