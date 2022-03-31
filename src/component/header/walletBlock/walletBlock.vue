<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import WalletDiv from './walletDiv/walletDiv.vue';
import ConnectBlock from './connectBlock/connectBlock.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,

    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'walletBlock',

      isA: this.$props.isAuthorized,
    };
  },
  components: { Div, WalletDiv, ConnectBlock },

  methods: {
    con() {
      console.log('af');
      this.isA = !this.isA;
    },
  },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <WalletDiv :block="name" v-if="isA"/>
    <ConnectBlock :block="name" :onclick="con" v-else />
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
