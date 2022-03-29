<script lang="ts">
import { defineComponent } from 'vue';
import Span from '@/element-rework/span/span.vue';
import Div from '@/element-rework/div/div.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'infoBlock',
    };
  },
  components: {
    Span,
    Div,
  },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <Div :block="name" :icon="'warning'"/>
    <Span :block="name">
      <slot></slot>
    </Span>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
