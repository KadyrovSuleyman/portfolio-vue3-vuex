<script setup lang="ts">

import Div from '@/element/div/div.vue';
import { computed } from 'vue';
import propsObj from '@/element/propsObj';
import Header from './Header/Header.vue';
import StakingAppBlock from './StakingAppBlock/StakingAppBlock.vue';
import Modals from './Modals/Modals.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'app' }));

</script>

<template>
  <Div :elem="comp.elem" :mods="props.mods">
    <Header :block="comp.elem" />
    <Div :block="comp.elem" :elem="'headerBorder'" />
    <StakingAppBlock :block="comp.elem"/>
    <Div :block="comp.elem" :elem="'footer'" />
  </Div>
  <Modals />
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
