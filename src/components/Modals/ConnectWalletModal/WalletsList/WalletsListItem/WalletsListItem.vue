<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Span from '@/elements/Span/Span.vue';
import propsObj from '@/elements/propsObj';

type OnClickFuncT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  onClick: {
    type: Function,
    default: (): OnClickFuncT => () => ({}),
  },

  icon: String,
});
const comp = computed(() => ({ elem: props.elem || 'walletsListItem' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods"
    :onClick="onClick"
  >
    <img :class="'walletsListItem-icon'" alt="" :src="props.icon" />
    <Span :block="comp.elem">
      <slot></slot>
    </Span>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
