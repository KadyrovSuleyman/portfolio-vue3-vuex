<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Span from '@/elements/Span/Span.vue';
import Button from '@/elements/Button/Button.vue';
import propsObj from '@/elements/propsObj';

type OnClickHandlerT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  onClick: {
    type: Function,
    default: (): OnClickHandlerT => () => ({}),
  },
});

const comp = computed(() => ({ elem: props.elem || 'addressBlock' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <Span :block="comp.elem">
      <slot></slot>
    </Span>
    <Button :block="comp.elem" :icon="'copy'" @click="onClick"/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
