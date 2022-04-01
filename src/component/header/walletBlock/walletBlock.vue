<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import WalletDiv from './walletDiv/walletDiv.vue';
import ConnectBlock from './connectBlock/connectBlock.vue';
import adapt from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletBlock' }));

const store = useStore();
const { isWalletConnect } = adapt(store);

const todo = () => { console.warn('called connect to wallet'); };

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <WalletDiv :block="comp.elem" v-if="isWalletConnect" />
    <ConnectBlock :block="comp.elem" :onclick="todo" v-else/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
