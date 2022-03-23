<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    msg: String,
    selected: Boolean,
  },

  data() {
    return {
      mods: {
        selected: this.$props.selected,
      },
      addMods,
    };
  },
});
</script>

<template>
  <div :class="addMods('navPanel-navButton', mods)">
    <a :class="addMods('navButton-link', mods)" href="#">{{ msg }}</a>
    <div :class="addMods('navButton-rectangle', mods)"></div>
  </div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
