<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import WalletApprovedBlock from './walletApprovedBlock/walletApprovedBlock.vue';
import TariffsBlock from './tariffsBlock/tariffsBlock.vue';
import CalculatorBlock from './calculatorBlock/calculatorBlock.vue';
import ActionsBlock from './actionsBlock/actionsBlock.vue';
import StakeInfoBlock from './stakeInfoBlock/stakeInfoBlock.vue';
import { adapt, generateViewContractClickHandler } from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'stakingAppBlock' }));

const store = useStore();
const state = computed(() => adapt(store));

const viewContractClickHandler = generateViewContractClickHandler(store);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <Span :block="comp.elem" :elem="'header'" >
      Staking App
    </Span>
    <WalletApprovedBlock :block="comp.elem" v-if="state.isWalletApproved"/>
    <TariffsBlock :block="comp.elem" v-if="!state.isStaked"/>
    <StakeInfoBlock :block="comp.elem" v-else/>
    <CalculatorBlock :block="comp.elem" v-if="!state.isStaked"/>
    <ActionsBlock :block="comp.elem" />

    <Div :block="comp.elem" :elem="'bgImg'" v-if="state.isStaked"/>

    <Button :block="comp.elem" :elem="'viewContractButton'"
      @click="viewContractClickHandler"
    >
      <Span :block="'viewContractButton'">
        View contract
      </Span>
    </Button>

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
