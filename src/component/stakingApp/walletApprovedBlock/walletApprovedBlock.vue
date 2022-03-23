<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Div, Span },
});
</script>

<template>
  <Div :className="'stakingApp-walletApprovedBlock'">
    <Span :className="'walletApprovedBlock-span'" :color="'gray'">
      Wallet approved
    </Span>
    <Div :className="'walletApprovedBlock-div'" :icon="'check'"/>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
