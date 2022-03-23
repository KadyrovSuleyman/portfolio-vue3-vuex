<script lang="ts">
import { defineComponent } from 'vue';
import Header from './component/header/index.vue';

export default defineComponent({
  setup() {
    return {
      log: () => { console.log('asdfas'); },
    };
  },
  components: { Header },
});
</script>

<template>
  <Header />
</template>

<style>
@import './sass/styles.scss';
</style>
