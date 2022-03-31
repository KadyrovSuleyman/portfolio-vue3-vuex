<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { reactive } from 'vue';

import ModsI from '../ModsI';

interface PropsI extends ModsI {
  block?: string,
  elem?: string,
  mods?: Record<string, unknown>,

  URL?: string,
  onClick?: (payload: MouseEvent) => void,
}
// eslint-disable-next-line no-undef
const props = defineProps<PropsI>();

const {
  mods: _mods, block: _block, elem: _elem, onClick: _onClick, ...filtredProps
} = reactive(props);

</script>

<template>
  <a :href="URL || '#'" @click="onClick" :class="formateClassName(block, elem || 'link', {
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
