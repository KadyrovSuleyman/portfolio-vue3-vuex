<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Link from '@/element/link/link.vue';
import propsObj from '@/element/propsObj';

type OnClickHandlerT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  URL: String,
  selected: Boolean,
  onClick: {
    type: Function,
    default: (): OnClickHandlerT => () => ({}),
  },
});
const comp = computed(() => ({
  elem: props.elem || 'navButton',
  selectedMod: { selected: props.selected || props.mods?.selected },
}));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem"
    :mods="{ ...props.mods, ...comp.selectedMod }">

    <Link :URL="URL" :block="comp.elem"
      :mods="comp.selectedMod"
      :onClick="props.onClick">
      <slot></slot>
    </Link>

    <Div :block="comp.elem" :elem="'rectangle'"
      :mods="comp.selectedMod" />
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
