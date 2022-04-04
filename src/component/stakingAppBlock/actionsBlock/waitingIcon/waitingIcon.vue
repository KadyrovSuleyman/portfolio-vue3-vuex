<script setup lang="ts">

import propsObj from '@/element/propsObj';
import { formateClassName } from '@/module/bem/index';
import { computed } from 'vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'waitingIcon' }));

</script>

<template>
  <div :class="formateClassName(props.block, comp.elem, {
        ...$props.mods,
      })">
      <div :class="'fill'"/>
      <div :class="'active'" />
  </div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
