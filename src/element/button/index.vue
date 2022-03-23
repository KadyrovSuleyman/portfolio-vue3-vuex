<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    msg: String,
    className: String,
    color: String,
  },

  data() {
    return {
      mods: {
        color: this.$props.color,
      },
      addMods,
    };
  },
});
</script>

<template>
  <button :class="addMods(className, mods)">
    {{ msg }}
  </button>
</template>

<style lang="scss">
  @import './style.scss';
</style>
