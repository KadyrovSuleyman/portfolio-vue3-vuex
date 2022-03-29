<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/element-rework/button/button.vue';
import Div from '@/element-rework/div/div.vue';
import Link from '@/element-rework/link/link.vue';
import Span from '@/element-rework/span/span.vue';
import NavPanel from './header/navPanel/navPanel.vue';
import Header from './header/header.vue';

export default defineComponent({
  data() {
    return {
      name: 'app',

      isAuthorized: false,
    };
  },
  components: {
    Header,
  },
});
</script>

<template>
  <Header :block="name" :isAuthorized="true"/>
</template>

<style lang="scss">
  // @use '@/modificators' as *;
  @use '.' as *;
</style>
