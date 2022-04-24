<script setup lang="ts">

import ConnectWalletModal from './ConnectWalletModal/ConnectWalletModal.vue';
import TransactionConfirmed from './TransactionConfirmed/TransactionConfirmed.vue';
import ReplenishModal from './ReplenishModal/ReplenishModal.vue';
import Copied from './Copied/Copied.vue';

</script>

<template>
  <ConnectWalletModal :target="'.app' || 'body'"/>
  <ReplenishModal :target="'.app' || 'body'"/>
  <TransactionConfirmed :target="'.app' || 'body'"/>
  <Copied :target="'.app' || 'body'"/>
</template>
