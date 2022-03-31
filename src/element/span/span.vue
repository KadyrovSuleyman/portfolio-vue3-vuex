<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { reactive } from 'vue';

import ModsI from '../ModsI';

interface PropsI extends ModsI {
  block?: string,
  elem?: string,
  mods?: Record<string, unknown>,

  msg?: string,
}
// eslint-disable-next-line no-undef
const props = defineProps<PropsI>();

const {
  msg, mods, block, elem, ...filtredProps
} = reactive(props);

</script>

<template>
  <span :class="formateClassName(block, elem || 'span', {
    ...filtredProps,
    ...mods,
  })">
    {{ msg }}
  </span>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=span] {
    @include default;
  }
</style>
