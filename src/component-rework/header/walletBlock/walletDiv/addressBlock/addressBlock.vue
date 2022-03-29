<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import Span from '@/element-rework/span/span.vue';
import Button from '@/element-rework/button/button.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'addressBlock',
    };
  },
  components: { Div, Span, Button },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <Span :block="name">
      0хCb99...8EBb
    </Span>
    <Button :block="name" :icon="'copy'" />
  </Div>

</template>

<style lang="scss">
  @use '.' as *;
</style>
