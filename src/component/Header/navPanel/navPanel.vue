<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import NavButton from './navButton/navButton.vue';

import { clickHandler, navItems } from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'navPanel' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <NavButton v-for="(isSelected, name) in navItems" :key="name"
      :block="comp.elem" :selected="isSelected" :onClick="clickHandler"
      :URL="`/${name.toString().toLocaleLowerCase()}`"
    >
      {{ name }}
    </NavButton>

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
