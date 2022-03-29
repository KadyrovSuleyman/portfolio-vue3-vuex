<script lang="ts">
import { addMods } from '@/module/bem/index';
import { defineComponent } from 'vue';

import propsObj from '../propsObj';
import typeMap from './__type';

export default defineComponent({
  props: {
    ...propsObj,
    mods: Object,
    className: String,
  },

  data() {
    const {
      mods, className, href, ...filtredProps
    } = this.$props;

    const { type } = this.$props;
    return {
      addMods,
      filtredProps,
      typeProps: type ? typeMap[type] : typeMap.default,
    };
  },
});
</script>

<template>
  <span :class="addMods(className, {
    ...typeProps,
    ...filtredProps,
    ...$props.mods,
  })">

    <slot></slot>
  </span>
</template>
