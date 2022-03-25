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
    ActionsBlock,
    Button,
  },
});
</script>

<template>
  <Div :className="'app-stakingAppBlock'" :border="'large'">
    <Span :className="'stakingAppBlock-span'" :header="true" :color="'main'">
      Staking App
    </Span>
    <WalletApprovedBlock v-if="isAuthorized"/>
    <TariffsBlock />
    <CalculatorBlock :isAuthorized="isAuthorized"/>
    <ActionsBlock :state="'Waitinga'"/>

    <Button :className="'stakingAppBlock-viewContractButton'" :color="'white'" :border="'smaller'">
      <Span :className="'viewContractButton-span'">
        View contract
      </Span>
    </Button>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
