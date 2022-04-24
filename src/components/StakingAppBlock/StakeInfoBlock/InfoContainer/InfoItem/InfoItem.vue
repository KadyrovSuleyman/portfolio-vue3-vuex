<script setup lang="ts">

import propsObj from '@/elements/propsObj';
import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Span from '@/elements/Span/Span.vue';

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
