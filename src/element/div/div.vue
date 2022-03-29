<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { formateClassName } from '@/module/bem/index';
import { defineComponent } from 'vue';

import propsObj from '../propsObj';

export default defineComponent({
  props: {
    ...propsObj,
    mods: Object,
    className: String,
    block: String,
    elem: String,
  },

  data() {
    const {
      mods, className, href, block, elem, ...filtredProps
    } = this.$props;

    return {
      formateClassName,
      filtredProps,
      blockName: this.$props.block,
      elementName: this.$props.elem || 'div',
    };
  },
});
</script>

<template>
  <div :class="formateClassName(blockName, elementName, {
    ...filtredProps,
    ...$props.mods,
  })">

    <slot></slot>
  </div>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=div] {
    @include default;
  }
</style>
