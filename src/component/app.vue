<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Header from './header/header.vue';
import StakingAppBlock from './stakingAppBlock/stakingAppBlock.vue';

export default defineComponent({
  data() {
    return {
      isAuthorized: false,
    };
  },
  components: { Header, StakingAppBlock, Div },
});
</script>

<template>
  <Header :isAuthorized="isAuthorized"/>
  <Div :className="'app-headerBorder'" />
  <StakingAppBlock :isAuthorized="isAuthorized"/>
</template>

<style>
@import './style.scss';
</style>
