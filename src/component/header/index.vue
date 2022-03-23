<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from './navPanel/index.vue';
import WalletBlock from './walletBlock/index.vue';

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
    <WalletBlock />
  </header>
</template>

<style lang="scss">
  @import './style.scss';
</style>
