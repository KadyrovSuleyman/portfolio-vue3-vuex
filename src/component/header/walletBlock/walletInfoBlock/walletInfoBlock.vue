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
  <Div :className="'walletBlock-walletInfoBlock'">
    <AddressBlock />
    <Span :className="'walletInfoBlock-span'" :color="'primary'">
      0.029 BUSD
    </Span>
    <Button :className="'walletInfoBlock-button'" :icon="'coin'" />
    <Button :className="'walletInfoBlock-button'" :icon="'chevron'"/>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
