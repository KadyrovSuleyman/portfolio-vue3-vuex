<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import autoClose from './autoClose';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  closeHandler: {
    type: Function,
    default: () => ({}),
  },
});
const comp = computed(() => ({ elem: props.elem || 'notification' }));

autoClose(props.closeHandler);

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
