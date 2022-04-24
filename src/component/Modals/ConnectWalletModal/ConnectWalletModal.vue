<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import WalletsList from './WalletsList/WalletsList.vue';
import { adapt } from './adapter';
import createCloseHandler from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  target: String,
});
const comp = computed(() => ({ elem: props.elem || 'connectWalletModal' }));

const store = useStore();
const state = computed(() => adapt(store));
const closeHandler = createCloseHandler(state);

</script>

<template>

<Teleport :to="props.target">
  <transition name="fade">
      <Div
        v-if="state.isShown"
        :block="props.block"
        :elem="comp.elem"
        :mods="props.mods"
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
  <Div
    v-if="state.isShown"
    :elem="'background'"
    :onClick="closeHandler"
      />
  </transition>
</Teleport>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
