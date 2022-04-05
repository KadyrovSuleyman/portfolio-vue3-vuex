<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import WalletsList from './walletsList/walletsList.vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,

  toClose: {
    type: Function,
    default: () => ({}),
  },
});
const comp = computed(() => ({ elem: props.elem || 'connectWalletModal' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <Span :block="comp.elem" :elem="'header'">
      Select the payment card that you want to use for payment
    </Span>
    <Span :block="comp.elem" :elem="'explanation'">
      The selected wallet will be connected to your staking
    </Span>
    <WalletsList :block="comp.elem" :toClose="props.toClose"/>
    <Button :block="comp.elem" :onClick="props.toClose" :icon="'cross'" />

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
