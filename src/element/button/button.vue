<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    className: String,
    color: String,
    icon: String,
    mods: Object,
  },

  data() {
    return {
      modificators: {
        ...this.$props.mods,
        color: this.$props.color,
        icon: this.$props.icon,
      },
      addMods,
    };
  },
});
</script>

<template>
  <button :class="addMods(className, modificators)">
    <slot></slot>
  </button>
</template>

<style lang="scss">
  @import './style.scss';
</style>
