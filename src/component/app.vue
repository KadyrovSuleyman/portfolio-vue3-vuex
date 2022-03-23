<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Header from './header/header.vue';
import StakingApp from './stakingApp/stakingApp.vue';

export default defineComponent({
  components: { Header, StakingApp, Div },
});
</script>

<template>
  <Header />
  <Div :className="'app-headerBorder'" />
  <StakingApp :isAuthorized="false"/>
</template>

<style>
@import './style.scss';
</style>
