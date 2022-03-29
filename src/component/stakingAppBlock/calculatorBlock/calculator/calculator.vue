<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';

export default defineComponent({
  components: {
    Div,
  },
});
</script>

<template>
  <Div :className="'calculatorBlock-calculator'">

  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
