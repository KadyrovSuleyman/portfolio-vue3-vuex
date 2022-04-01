<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';

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
    <Span :block="comp.elem" :mods="props.mods">
      <slot></slot>
    </Span>
    <Button :block="comp.elem" :icon="'copy'" :mods="props.mods"
      @click="props.onClick"/>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
