<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import Button from '@/element-rework/button/button.vue';
import Span from '@/element-rework/span/span.vue';
import AddressBlock from './addressBlock/addressBlock.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    Div,
    Button,
    Span,
    AddressBlock,
  },
});
</script>

<template>
  <Div
    :className="'walletBlock-walletDiv'"
    :border="'smaller'"
    :background="'white'"
  >
    <AddressBlock />
    <Span :className="'walletDiv-span'">
      0.029 BUSD
    </Span>
    <Button :className="'walletDiv-button'" :icon="'coin'" />
    <Button :className="'walletDiv-button'" :icon="'chevron'"/>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
