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
      elementName: this.$props.elem || 'button',
    };
  },
});
</script>

<template>
  <button :class="formateClassName(blockName, elementName, {
    ...filtredProps,
    ...$props.mods,
  })">

    <slot></slot>
  </button>
</template>

<style lang="scss">
  @use '__type' as *;

  [class*=button] {
    @include default;
  }
</style>
