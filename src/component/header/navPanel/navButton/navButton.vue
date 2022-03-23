<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';
import Link from '@/element/link/link.vue';
import Div from '@/element/div/div.vue';

export default defineComponent({
  props: {
    msg: String,
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
  components: { Link, Div },
});
</script>

<template>
  <Div :className="'navPanel-navButton'" :mods="mods">
    <Link :className="'navButton-link'" :href="'#'" :color="'primary'" :mods="mods">
      {{ msg }}
    </Link>
    <Div :className="'navButton-rectangle'" :mods="mods" />
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
