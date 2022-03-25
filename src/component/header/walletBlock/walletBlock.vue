<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import ConnectBlock from './connectBlock/connectBlock.vue';
import WalletDiv from './walletDiv/walletDiv.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,
  },
  setup() {
    return {};
  },
  components: { Div, ConnectBlock, WalletDiv },
});
</script>

<template>
  <Div :className="'header-walletBlock'">
    <WalletDiv v-if="isAuthorized"/>
    <ConnectBlock v-else />
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
