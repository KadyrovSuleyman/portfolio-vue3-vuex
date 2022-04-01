<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import { createStore, useStore } from 'vuex';
import Span from '@/element/span/span.vue';
import Header from './header/header.vue';
import StakingAppBlock from './stakingAppBlock/stakingAppBlock.vue';

// export default defineComponent({
//   data() {
//     return {
//       name: 'app',

//       isAuthorized: false,

//       msg: this.$store.state.count,
//       click: this.$store.commit('INCREMENT'),
//     };
//   },
//   components: {
//     Header,
//     Div,
//     StakingAppBlock,
//     Button,
//   },
// });

const name = 'app';
const isAuthorized = false;

const store = useStore();

</script>

<template>
  <Header :block="name" :isAuthorized="false"/>
  <Div :block="name" :elem="'headerBorder'" />
  <StakingAppBlock :block="name" :isAuthorized="false" />

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
  @use '.' as *;
</style>
