<script setup lang="ts">

import { computed } from 'vue';
import Span from '@/elements/Span/Span.vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'infoBlock' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <Div :block="comp.elem" :icon="'warning'"/>
    <Span :block="comp.elem">
      <slot></slot>
    </Span>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
