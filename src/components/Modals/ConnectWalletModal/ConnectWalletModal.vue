<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Span from '@/elements/Span/Span.vue';
import Button from '@/elements/Button/Button.vue';
import propsObj from '@/elements/propsObj';
import { useStore } from 'vuex';
import WalletsList from './WalletsList/WalletsList.vue';
import { adaptState } from './state';
import createCloseHandler from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  target: String,
});
const comp = computed(() => ({ elem: props.elem || 'connectWalletModal' }));

const store = useStore();
const state = computed(() => adaptState(store));
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
