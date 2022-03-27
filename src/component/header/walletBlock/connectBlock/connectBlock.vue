<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';
import Button from '@/element-rework/button/index.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Div, Button },
});
</script>

<template>
  <Div :className="'walletBlock-connectBlock'">
    <Button
      :className="'connectBlock-button'"
      :background="'white'"
      :border="'smaller'"
    >
      Connect wallet
    </Button>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
