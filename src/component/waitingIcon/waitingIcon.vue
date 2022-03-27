<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    className: String,
    mods: Object,
  },

  data() {
    return {
      addMods,
    };
  },
});
</script>

<template>
  <div :class="addMods(className, {
        ...$props.mods,
      })">
      <div :class="'fill'"/>
      <div :class="'active'" />
  </div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
