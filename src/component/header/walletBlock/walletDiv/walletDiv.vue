<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import AddressBlock from './addressBlock/addressBlock.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    AddressBlock, Div, Span, Button,
  },
});
</script>

<template>
  <Div :className="'walletBlock-walletDiv'" :border="'smaller'">
    <AddressBlock />
    <Span :className="'walletDiv-span'" :color="'main'">
      0.029 BUSD
    </Span>
    <Button :className="'walletDiv-button'" :icon="'coin'" />
    <Button :className="'walletDiv-button'" :icon="'chevron'"/>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
