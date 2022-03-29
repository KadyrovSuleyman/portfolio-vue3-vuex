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
      name: this.$props.elem || 'tip',
    };
  },
  components: { Div, Span },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <Div :block="name" :elem="'triangle'" />
    <Div :block="name">
      <Span :block="name">
        Tip text hover
      </Span>
    </Div>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
