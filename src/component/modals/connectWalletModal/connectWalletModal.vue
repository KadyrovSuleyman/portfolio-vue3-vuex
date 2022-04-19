<script setup lang="ts">

import { computed, ref, VueElement } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import WalletsList from './walletsList/walletsList.vue';
import { adapt, generateCloseHandler } from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  target: String,
});
const comp = computed(() => ({ elem: props.elem || 'connectWalletModal' }));

const store = useStore();
const state = computed(() => adapt(store));
const closeHandler = generateCloseHandler(store);

</script>

<template>

<Teleport :to="props.target">
  <transition name="fade">
      <Div :block="props.block" :elem="comp.elem" :mods="props.mods"
        v-if="state.isShown"
      >
        <Span :block="comp.elem" :elem="'header'">
          Select the payment card that you want to use for payment
        </Span>
        <Span :block="comp.elem" :elem="'explanation'">
          The selected wallet will be connected to your staking
        </Span>
        <WalletsList :block="comp.elem" />
        <Button :block="comp.elem" :onClick="closeHandler" :icon="'cross'" />
      </Div>
  </transition>

  <transition name="fade">
  <Div :elem="'background'"
        v-if="state.isShown"
        :onClick="closeHandler"
      />
  </transition>
</Teleport>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
