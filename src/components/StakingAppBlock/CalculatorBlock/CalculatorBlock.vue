<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';
import { useStore } from 'vuex';
import Calculator from './Calculator/Calculator.vue';
import InfoBlock from './InfoBlock/InfoBlock.vue';
import adapt from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'calculatorBlock' }));

const store = useStore();
const state = computed(() => adapt(store));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <InfoBlock v-if="!state.isWalletConnected" :block="comp.elem">
      To perform actions on the page, connect your wallet
    </InfoBlock>

    <InfoBlock v-else-if="!state.isWalletApproved" :block="comp.elem">
      To perform actions on the page, approve your wallet
    </InfoBlock>

    <Calculator v-else-if="!state.isStaked" :block="comp.elem"/>

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
