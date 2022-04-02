<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import { createStore, useStore } from 'vuex';
import Span from '@/element/span/span.vue';
import Header from './header/header.vue';
import StakingAppBlock from './stakingAppBlock/stakingAppBlock.vue';

const name = 'app';
const isAuthorized = true;

const store = useStore();

</script>

<template>
  <Header :block="name" />
  <Div :block="name" :elem="'headerBorder'" />
  <StakingAppBlock :block="name" :isAuthorized="true" />

  <Button :onClick="() => { store.commit('change'); }"
  :mods="{ str: store.state.str }"
  :block="store.state.str"
  :temp="store.state.str"
  :type="store.state.str"
  >{{  store.state.str }}</Button>

  <Span :mods="{ str: store.state.str }">{{ store.state.str }}</Span>

</template>

<style lang="scss">
  // @use '@/modificators' as *;
  @use 'styles' as *;
</style>
