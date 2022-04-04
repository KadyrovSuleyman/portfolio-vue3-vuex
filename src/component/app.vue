<script setup lang="ts">

import Div from '@/element/div/div.vue';
import Header from './header/header.vue';
import StakingAppBlock from './stakingAppBlock/stakingAppBlock.vue';

const elem = 'app';

</script>

<template>
  <Div :elem="elem">
    <Header :block="elem" />
    <Div :block="elem" :elem="'headerBorder'" />
    <StakingAppBlock :block="elem"/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
