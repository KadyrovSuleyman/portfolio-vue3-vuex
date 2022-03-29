<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import Button from '@/element-rework/button/button.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'connectBlock',
    };
  },
  components: { Div, Button },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <Button :block="name">
      Connect wallet
    </Button>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
