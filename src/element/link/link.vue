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
      modificators: {
        ...this.$props.mods,
        color: this.$props.color,
      },
      addMods,
    };
  },
});
</script>

<template>
  <a
    :class="addMods(className, modificators)"
    :href="href"
  >
    <slot></slot>
  </a>
</template>

<style lang="scss">
  @import './style.scss';
</style>
