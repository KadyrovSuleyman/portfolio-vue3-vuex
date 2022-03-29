<script lang="ts">
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
      elementName: this.$props.elem || 'span',
    };
  },
});
</script>

<template>
  <span :class="formateClassName(blockName, elementName, {
    ...filtredProps,
    ...$props.mods,
  })">

    <slot></slot>
  </span>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=span] {
    @include default;
  }
</style>
