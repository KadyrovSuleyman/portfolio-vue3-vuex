<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/element-rework/button/button.vue';
import Div from '@/element-rework/div/div.vue';
import Link from '@/element-rework/link/link.vue';
import Span from '@/element-rework/span/span.vue';
import NavPanel from './header/navPanel/navPanel.vue';
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
  <Header :block="name" :isAuthorized="true"/>
  <Div :block="name" :elem="'headerBorder'" />
  <StakingAppBlock :block="name" :isAuthorized="false" />
</template>

<style lang="scss">
  // @use '@/modificators' as *;
  @use '.' as *;
</style>
