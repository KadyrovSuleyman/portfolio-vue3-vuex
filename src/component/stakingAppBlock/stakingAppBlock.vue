<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import WalletApprovedBlock from './walletApprovedBlock/walletApprovedBlock.vue';
import TariffsBlock from './tariffsBlock/tariffsBlock.vue';
import CalculatorBlock from './calculatorBlock/calculatorBlock.vue';
import ActionsBlock from './actionsBlock/actionsBlock.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,

    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'stakingAppBlock',
    };
  },
  components: {
    WalletApprovedBlock,
    TariffsBlock,
    CalculatorBlock,
    ActionsBlock,
    Div,
    Span,
    Button,
  },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <Span :block="name" :elem="'header'" >
      Staking App
    </Span>
    <WalletApprovedBlock :block="name" v-if="isAuthorized"/>
    <TariffsBlock :block="name" />
    <CalculatorBlock :block="name" :isAuthorized="isAuthorized"/>
    <ActionsBlock :block="name" :state="'Waiting'"/>

    <Button :block="name" :elem="'viewContractButton'" >
      <Span :block="'viewContractButton'">
        View contract
      </Span>
    </Button>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
