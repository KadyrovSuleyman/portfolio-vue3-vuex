<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import WalletInfoBlock from './walletInfoBlock/walletInfoBlock.vue';
import ConnectBlock from './connectBlock/connectBlock.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,
  },
  setup() {
    return {};
  },
  components: { WalletInfoBlock, Div, ConnectBlock },
});
</script>

<template>
  <Div :className="'header-walletBlock'">
    <WalletInfoBlock v-if="isAuthorized"/>
    <ConnectBlock v-else />
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
