<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import Div from '@/element/div/div.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Button, Span, Div },
});
</script>

<template>
  <Div :className="'walletInfoBlock-addressBlock'">
    <Span
      :class-name="'addressBlock-span'"
      :color="'secondary'"
    >
      0хCb99...8EBb
    </Span>
    <Button
      :class-name="'addressBlock-button'"
      :icon="'copy'"
    />
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
