<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import WalletsList from './walletsList/walletsList.vue';
import generateCloseHandler from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'connectWalletModal' }));

const store = useStore();
const closeHandler = generateCloseHandler(store);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <Span :block="comp.elem" :elem="'header'">
      Select the payment card that you want to use for payment
    </Span>
    <Span :block="comp.elem" :elem="'explanation'">
      The selected wallet will be connected to your staking
    </Span>
    <WalletsList :block="comp.elem" />
    <Button :block="comp.elem" :onClick="closeHandler" :icon="'cross'" />

  </Div>
  <Div :elem="'background'" />
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
