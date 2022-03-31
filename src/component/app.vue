<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Header from './header/header.vue';
import StakingAppBlock from './stakingAppBlock/stakingAppBlock.vue';

export default defineComponent({
  data() {
    return {
      name: 'app',

      isAuthorized: false,
    };
  },
  components: {
    Header,
    Div,
    StakingAppBlock,
  },
});
</script>

<template>
  <Header :block="name" :isAuthorized="false"/>
  <Div :block="name" :elem="'headerBorder'" />
  <StakingAppBlock :block="name" :isAuthorized="false" />
</template>

<style lang="scss">
  // @use '@/modificators' as *;
  @use '.' as *;
</style>
