<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';
import NavButton from './NavButton/NavButton.vue';

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
