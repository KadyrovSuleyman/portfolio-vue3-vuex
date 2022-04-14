<script setup lang="ts">

import {
  computed, onMounted, onUnmounted, ref,
} from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import generateCloseHandler from './adapter';
import autoClose from './autoClose';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'notification' }));

const store = useStore();
const closeHandler = generateCloseHandler(store);

autoClose(closeHandler);

</script>

<template>

  <Div :block="props.block" :elem="comp.elem" :mods="{ ...props.mods }">
    <slot></slot>
    <Button :block="comp.elem" :onClick="closeHandler" :icon="'cross'" />
  </Div>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
