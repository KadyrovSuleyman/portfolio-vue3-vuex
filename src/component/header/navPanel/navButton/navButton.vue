<script lang="ts">
import { formateClassName } from '@/module/bem/index';
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Link from '@/element/link/link.vue';

export default defineComponent({
  props: {
    selected: Boolean,
    block: String,
    elem: String,
  },
  data() {
    return {
      mods: {
        selected: this.$props.selected,
      },
      formateClassName,

      parentName: this.$props.block,
      name: this.$props.elem || 'navButton',
    };
  },
  components: { Div, Link },
});
</script>

<template>
  <Div :block="parentName" :elem="name" :mods="mods">
    <Link :block="name" :mods="mods">
      <slot></slot>
    </Link>
    <Div :block="name" :elem="'rectangle'" :mods="mods" />
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
