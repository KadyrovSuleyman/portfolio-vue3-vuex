<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';
import { useStore } from 'vuex';
import WalletDiv from './WalletDiv/WalletDiv.vue';
import ConnectBlock from './ConnectBlock/ConnectBlock.vue';
import { adaptState } from './state';
import createShowConnectWalletModal from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletBlock' }));

const store = useStore();
const state = computed(() => adaptState(store));

const showConnectWalletModal = createShowConnectWalletModal(state);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <WalletDiv :block="comp.elem" v-if="state.isWalletConnect" />
    <ConnectBlock :block="comp.elem" v-else
      :onClick="showConnectWalletModal"
    />
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
