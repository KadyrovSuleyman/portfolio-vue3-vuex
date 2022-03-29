<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import NavButton from './navButton/navButton.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { NavButton, Div },
});
</script>

<template>
  <Div :className="'header-navPanel'">
      <NavButton :selected="true">Stacking</NavButton>
      <NavButton>Bridge</NavButton>
      <NavButton>SHO</NavButton>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
