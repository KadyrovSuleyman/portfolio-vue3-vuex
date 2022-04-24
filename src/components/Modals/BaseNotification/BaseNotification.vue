<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Button from '@/elements/Button/Button.vue';
import propsObj from '@/elements/propsObj';
import autoClose from './autoClose';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  closeHandler: {
    type: Function,
    default: () => ({}),
  },
  duration: Number,
});
const comp = computed(() => ({ elem: props.elem || 'notification' }));

autoClose(props.closeHandler, props.duration);

</script>

<template>
    <Div :block="props.block" :elem="comp.elem" :mods="{ ...props.mods }">
      <slot></slot>
      <Button :block="comp.elem" :onClick="props.closeHandler" :icon="'cross_white'" />
    </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
