<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';
import WalletDiv from './walletDiv/walletDiv.vue';
import ConnectBlock from './connectBlock/connectBlock.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,
  },
  setup() {
    return {};
  },
  components: { Div, WalletDiv, ConnectBlock },
});
</script>

<template>
  <Div :className="'header-walletBlock'">
    <WalletDiv v-if="isAuthorized"/>
    <ConnectBlock v-else />
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
