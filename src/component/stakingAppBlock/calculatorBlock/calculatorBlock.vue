<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
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
    Calculator,
    InfoBlock,
    Div,
  },
});
</script>

<template>
  <Div :className="'stakingAppBlock-calculatorBlock'">
    <Calculator v-if="isAuthorized" />
    <InfoBlock v-else >
      To perform actions on the page, connect your wallet
    </InfoBlock>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
