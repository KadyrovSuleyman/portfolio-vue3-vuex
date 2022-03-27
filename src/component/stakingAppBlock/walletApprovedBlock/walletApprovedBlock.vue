<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';
import Span from '@/element-rework/span/index.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Div, Span },
});
</script>

<template>
  <Div :className="'stakingAppBlock-walletApprovedBlock'" :border="'medium'">
    <Span :className="'walletApprovedBlock-span'" :color="'subtext'">
      Wallet approved
    </Span>
    <Div :className="'walletApprovedBlock-div'" :icon="'check'"/>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
