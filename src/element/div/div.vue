<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    className: String,
    color: String,
    icon: String,
    border: String,
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
  <div
    :class="addMods(className, {
        ...$props.mods,
        color: $props.color,
        icon: $props.icon,
        border: $props.border,
      })"
  >
  <slot></slot>
  </div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
