<script setup lang="ts">

import propsObj from '@/element/propsObj';
import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'infoItem' }));

</script>

<template>

  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <Span :block="comp.elem" :elem="'header'">
      <slot name="header"></slot>
    </Span>

    <Span :block="comp.elem" :elem="'value'">
      <slot></slot>
    </Span>

  </Div>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
