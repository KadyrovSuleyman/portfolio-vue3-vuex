<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { defineProps, reactive } from 'vue';

import ModsI from '../propsObj';

interface PropsI extends ModsI {
  block?: string,
  elem?: string,
  mods?: Record<string, undefined>,

  onclick?:(payload: MouseEvent) => void,
}
const props = defineProps<PropsI>();

const {
  mods: _mods, block: _block, elem: _elem, onclick: _onclick, ...filtredProps
} = reactive(props);

</script>

<template>
  <button :class="formateClassName(block, elem || 'button', {
    ...filtredProps,
    ...mods,
  })" @click="onclick">

    <slot></slot>
  </button>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=button] {
    @include default;
  }
</style>
