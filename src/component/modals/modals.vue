<script setup lang="ts">

import ConnectWalletModal from './connectWalletModal/connectWalletModal.vue';
import TransactionConfirmed from './transactionConfirmed/transactionConfirmed.vue';
import ReplenishModal from './replenishModal/replenishModal.vue';

</script>

<template>
  <ConnectWalletModal :target="'.app' || 'body'"/>
  <ReplenishModal :target="'.app' || 'body'"/>
  <TransactionConfirmed :target="'.app' || 'body'"/>
</template>
