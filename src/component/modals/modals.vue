<script setup lang="ts">

import { computed } from 'vue';
import { useStore } from 'vuex';
import adapt from './adapter';
import ConnectWalletModal from './connectWalletModal/connectWalletModal.vue';
import BaseNotification from './baseNotification/baseNotification.vue';
import TransactionConfirmed from './transactionConfirmed/transactionConfirmed.vue';

const store = useStore();

</script>

<template>
  <ConnectWalletModal :target="'.app' || 'body'"/>

  <TransactionConfirmed :target="'.app' || 'body'"/>
</template>
