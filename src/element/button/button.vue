<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { defineProps, reactive } from 'vue';

import propsObj from '../propsObj';

interface propsObjj {
  type?: string,

  background?: string,
  color?: string,
  icon?: string,
  border?: string,
  href?: string,
  font?: string,
  fontWeight?: string,
  cursor?: string,
}

interface PropsI extends propsObjj {
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
