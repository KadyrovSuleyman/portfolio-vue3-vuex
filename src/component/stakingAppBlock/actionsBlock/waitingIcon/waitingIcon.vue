<script lang="ts">
import { formateClassName } from '@/module/bem/index';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    mods: Object,

    block: String,
    elem: String,
  },

  data() {
    return {
      formateClassName,
      blockName: this.$props.block,
      elementName: this.$props.elem || 'waitingIcon',
    };
  },
});
</script>

<template>
  <div :class="formateClassName(blockName, elementName, {
        ...$props.mods,
      })">
      <div :class="'fill'"/>
      <div :class="'active'" />
  </div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
