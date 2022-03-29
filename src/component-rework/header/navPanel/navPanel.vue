<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import NavButton from './navButton/navButton.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'navPanel',
    };
  },
  components: { NavButton, Div },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
      <NavButton :block="name" :selected="true">Stacking</NavButton>
      <NavButton :block="name">Bridge</NavButton>
      <NavButton :block="name">SHO</NavButton>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
