<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import WalletApprovedBlock from './walletApprovedBlock/walletApprovedBlock.vue';
import TariffsBlock from './tariffsBlock/tariffsBlock.vue';
import CalculatorBlock from './calculatorBlock/calculatorBlock.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,
  },
  setup() {
    return {};
  },
  components: {
    Div,
    Span,
    WalletApprovedBlock,
    TariffsBlock,
    CalculatorBlock,
  },
});
</script>

<template>
  <Div :className="'app-stakingApp'">
    <Span :className="'stakingApp-span'" :header="true" :color="'primary'">
      Staking App
    </Span>
    <WalletApprovedBlock v-if="isAuthorized"/>
    <TariffsBlock />
    <CalculatorBlock :isAuthorized="isAuthorized"/>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
