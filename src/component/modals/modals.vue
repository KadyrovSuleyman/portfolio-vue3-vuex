<script setup lang="ts">

import { computed } from 'vue';
import { useStore } from 'vuex';
import adapt from './adapter';
import ConnectWalletModal from './connectWalletModal/connectWalletModal.vue';
import BaseNotification from './baseNotification/baseNotification.vue';

const store = useStore();
const modalsShown = computed(() => adapt(store));

</script>

<template>

  <Teleport v-if="modalsShown.connectWallet" to=".app">
    <ConnectWalletModal/>
  </Teleport>

  <Teleport v-if="modalsShown.transactionConfirmed" to=".app">
    <BaseNotification :block="'asdf'">
      asdfasdf
    </BaseNotification>
  </Teleport>

</template>
