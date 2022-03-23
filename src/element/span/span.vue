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
      modificators: {
        ...this.$props.mods,
        color: this.$props.color,
        header: this.$props.header,
        font: this.$props.font,
      },
      addMods,
    };
  },
});
</script>

<template>
  <span :class="addMods(className, modificators)">
    <slot></slot>
  </span>
</template>

<style lang="scss">
  @import './style.scss';
</style>
