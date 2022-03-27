<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    className: String,
    background: String,
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
  <button :class="addMods(className, {
    ...$props.mods,
    color: $props.color,
    icon: $props.icon,
    border: $props.border,
    background: $props.background,
  })">

    <slot></slot>
  </button>
</template>

<style lang="scss">
  @use '../../modificators';
</style>
