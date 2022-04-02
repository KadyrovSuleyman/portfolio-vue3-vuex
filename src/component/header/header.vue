<script setup lang="ts">

import propsObj from '@/element/propsObj';
import { formateClassName } from '@/module/bem';
import { computed } from 'vue';
import NavPanel from './navPanel/navPanel.vue';
import WalletBlock from './walletBlock/walletBlock.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'header' }));

</script>

<template>
  <header :class="formateClassName(props.block, comp.elem, { ...props.mods })">
    <NavPanel :block="comp.elem"/>
    <WalletBlock :block="comp.elem"/>
  </header>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
