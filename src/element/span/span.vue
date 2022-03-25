<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    className: String,
    color: String,
    header: Boolean,
    font: String,
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
  <span :class="addMods(className, {
        ...$props.mods,
        color: $props.color,
        header: $props.header,
        font: $props.font,
      })">
    <slot></slot>
  </span>
</template>

<style lang="scss">
  @import './style.scss';
</style>
