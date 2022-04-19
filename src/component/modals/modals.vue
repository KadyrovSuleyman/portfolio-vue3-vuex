<script setup lang="ts">

import { computed } from 'vue';
import { useStore } from 'vuex';
import adapt from './adapter';
import ConnectWalletModal from './connectWalletModal/connectWalletModal.vue';
import BaseNotification from './baseNotification/baseNotification.vue';

</script>

<template>
  <ConnectWalletModal :target="'.app' || 'body'"/>
</template>
