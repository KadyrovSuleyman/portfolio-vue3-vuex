<script lang="ts">
import { defineComponent } from 'vue';
import NavButton from './navButton/index.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { NavButton },
});
</script>

<template>
    <div class="header-navPanel">
      <NavButton :msg="'Stacking'" :selected="true"/>
      <NavButton :msg="'Bridge'" />
      <NavButton :msg="'SHO'" />
    </div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
