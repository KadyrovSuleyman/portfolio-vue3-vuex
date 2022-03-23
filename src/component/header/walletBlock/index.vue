<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/element/button/index.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Button },
});
</script>

<template>
  <div class="header-walletBlock">
    <div class="walletBlock-connectBlock">
      <Button
        :className="'connectBlock-button'"
        :msg="'Connect wallet'"
        :color="'secondary'"
      />
    </div>
  </div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
