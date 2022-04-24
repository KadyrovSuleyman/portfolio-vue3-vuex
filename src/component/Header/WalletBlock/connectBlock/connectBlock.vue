<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
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

const comp = computed(() => ({ elem: props.elem || 'connectBlock' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <Button :block="comp.elem" @click="props.onClick">
      Connect wallet
    </Button>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
