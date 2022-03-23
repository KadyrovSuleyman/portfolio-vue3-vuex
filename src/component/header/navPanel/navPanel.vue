<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
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
      <NavButton :msg="'Stacking'" :selected="true"/>
      <NavButton :msg="'Bridge'" />
      <NavButton :msg="'SHO'" />
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
