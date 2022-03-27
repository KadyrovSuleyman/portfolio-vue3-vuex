<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';
import Span from '@/element-rework/span/index.vue';
import Button from '@/element-rework/button/index.vue';
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
  <Div :className="'app-stakingAppBlock'" :border="'large'">
    <Span :className="'stakingAppBlock-span'" :mods="{ header: true }" >
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
  @use '.' as *;
</style>
