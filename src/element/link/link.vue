<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    className: String,
    color: String,
    href: String,
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
  <a
    :class="addMods(className, {
        ...$props.mods,
        color: $props.color,
      })"
    :href="href"
  >
    <slot></slot>
  </a>
</template>

<style lang="scss">
  @import './style.scss';
</style>
