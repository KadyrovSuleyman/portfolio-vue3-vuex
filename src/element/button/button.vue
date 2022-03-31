<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName, ModsT } from '@/module/bem/index';
import { reactive } from 'vue';

import ModsI from '../ModsI';

interface PropsI extends ModsI {
  block?: string,
  elem?: string,
  mods?: Record<string, unknown>,

  onClick?:(payload: MouseEvent) => void,
}
// eslint-disable-next-line no-undef
const props = defineProps<PropsI>();

const {
  mods, block, elem, onClick, ...filtredProps
} = reactive(props);

</script>

<template>
  <button @click="onClick" :class="formateClassName(block, elem || 'button', {
    ...filtredProps,
    ...mods,
  })">

    <slot></slot>
  </button>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=button] {
    @include default;
  }
</style>
