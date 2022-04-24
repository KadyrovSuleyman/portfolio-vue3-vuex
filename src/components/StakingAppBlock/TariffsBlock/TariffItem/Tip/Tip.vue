<script setup lang="ts">
import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Span from '@/elements/Span/Span.vue';
import propsObj from '@/elements/propsObj';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'tip' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <Div :block="comp.elem" :elem="'triangle'" />
    <Div :block="comp.elem">
      <Span :block="comp.elem">
        <slot></slot>
      </Span>
    </Div>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
