<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Calculator from './calculator/calculator.vue';
import InfoBlock from './infoBlock/infoBlock.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,
  },
  setup() {
    return {};
  },
  components: {
    Div,
    Calculator,
    InfoBlock,
  },
});
</script>

<template>
  <Div :className="'stakingApp-calculatorBlock'">
    <Calculator v-if="isAuthorized" />
    <InfoBlock v-else >
      To perform actions on the page, connect your wallet
    </InfoBlock>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
