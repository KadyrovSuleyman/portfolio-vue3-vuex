<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from './navPanel/navPanel.vue';
import WalletBlock from './walletBlock/walletBlock.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { NavPanel, WalletBlock },
});
</script>

<template>
  <header class="app-header">
    <NavPanel />
    <WalletBlock :isAuthorized="true"/>
  </header>
</template>

<style lang="scss">
  @import './style.scss';
</style>
