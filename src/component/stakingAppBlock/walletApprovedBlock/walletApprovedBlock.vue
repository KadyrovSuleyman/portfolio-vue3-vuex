<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'walletApprovedBlock',
    };
  },
  components: { Div, Span },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <Span :block="name">
      Wallet approved
    </Span>
    <Div :block="name" :icon="'check'"/>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
