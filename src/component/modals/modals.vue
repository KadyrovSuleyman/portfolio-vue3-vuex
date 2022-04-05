<script setup lang="ts">

import { computed } from 'vue';
import { useStore } from 'vuex';
import adapt from './adapter';
import ConnectWalletModal from './connectWalletModal/connectWalletModal.vue';

const store = useStore();
const modalsShown = computed(() => adapt(store));
const close = (modal: string) => () => { modalsShown.value[modal] = false; };

</script>

<template>

  <Teleport v-if="modalsShown.connectWallet" to=".app">
    <ConnectWalletModal :toClose="close('connectWallet')" />
  </Teleport>

</template>
