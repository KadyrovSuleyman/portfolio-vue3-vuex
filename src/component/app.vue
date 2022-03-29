<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';
import StakingAppBlock from './stakingAppBlock/stakingAppBlock.vue';
import Header from './header/header.vue';

export default defineComponent({
  data() {
    return {
      isAuthorized: false,
    };
  },
  components: {
    StakingAppBlock,
    Div,
    Header,
  },
});
</script>

<template>
  <Header :isAuthorized="isAuthorized"/>
  <Div :className="'app-headerBorder'" />
  <StakingAppBlock :isAuthorized="isAuthorized"/>
</template>

<style lang="scss">
  @use '@/modificators' as *;
  @use '.' as *;
</style>
