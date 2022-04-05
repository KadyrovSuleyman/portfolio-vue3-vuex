<script setup lang="ts">

import Div from '@/element/div/div.vue';
import { computed } from 'vue';
import propsObj from '@/element/propsObj';
import Header from './header/header.vue';
import StakingAppBlock from './stakingAppBlock/stakingAppBlock.vue';
import Modals from './modals/modals.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'app' }));

</script>

<template>
  <Div :elem="comp.elem" :mods="props.mods">
    <Header :block="comp.elem" />
    <Div :block="comp.elem" :elem="'headerBorder'" />
    <StakingAppBlock :block="comp.elem"/>
  </Div>
  <Modals />
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
