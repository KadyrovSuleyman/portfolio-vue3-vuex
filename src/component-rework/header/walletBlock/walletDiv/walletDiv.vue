<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import Button from '@/element-rework/button/button.vue';
import Span from '@/element-rework/span/span.vue';
import AddressBlock from './addressBlock/addressBlock.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'walletDiv',
    };
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
  <Div :block="parentName" :elem="name" >
    <AddressBlock :block="name"/>
    <Span :block="name">
      0.029 BUSD
    </Span>
    <Button :block="name" :icon="'coin'" />
    <Button :block="name" :icon="'chevron'"/>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
