<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from './navPanel/navPanel.vue';
import WalletBlock from './walletBlock/walletBlock.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,

    isAuthorized: Boolean,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'header',
    };
  },
  components: { NavPanel, WalletBlock },
});
</script>

<template>
  <header :class="`${parentName}-${name}`">
    <NavPanel :block="name"/>
    <WalletBlock :block="name" :isAuthorized="isAuthorized"/>
  </header>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
