<script setup lang="ts">

import { computed, ref } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import ConnectWalletModal from '@/component/connectWalletModal/connectWalletModal.vue';
import WalletDiv from './walletDiv/walletDiv.vue';
import ConnectBlock from './connectBlock/connectBlock.vue';
import adapt from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletBlock' }));

const store = useStore();
const state = computed(() => adapt(store));

const isModalOpen = ref(false);
const toCloseModal = () => { isModalOpen.value = false; };
const toOpenModal = () => { isModalOpen.value = true; };

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <WalletDiv :block="comp.elem" v-if="state.isWalletConnect" />
    <ConnectBlock :block="comp.elem" :onclick="toOpenModal" v-else/>
  </Div>

  <Teleport v-if="isModalOpen" to=".app">
    <ConnectWalletModal :toClose="toCloseModal" />
  </Teleport>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
