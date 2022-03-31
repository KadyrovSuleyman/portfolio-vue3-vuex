<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,

    onclick: Function,
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
    <Button :block="name" @click="onclick">
      Connect wallet
    </Button>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
