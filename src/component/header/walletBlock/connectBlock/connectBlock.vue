<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/element/button/button.vue';
import Div from '@/element/div/div.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Button, Div },
});
</script>

<template>
  <Div :className="'walletBlock-connectBlock'">
    <Button
      :className="'connectBlock-button'"
      :color="'secondary'"
    >
      Connect wallet
    </Button>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
