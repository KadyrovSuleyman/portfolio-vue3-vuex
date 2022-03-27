<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';
import Link from '@/element-rework/link/index.vue';

export default defineComponent({
  props: {
    selected: Boolean,
  },
  data() {
    return {
      mods: {
        selected: this.$props.selected,
      },
      addMods,
    };
  },
  components: { Div, Link },
});
</script>

<template>
  <Div :className="'navPanel-navButton'" :mods="mods">
    <Link :className="'navButton-link'" :href="'#'" :mods="mods">
      <slot></slot>
    </Link>
    <Div :className="'navButton-rectangle'" :mods="mods" />
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
