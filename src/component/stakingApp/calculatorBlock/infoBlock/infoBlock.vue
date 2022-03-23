<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';

export default defineComponent({
  components: {
    Div,
    Span,
  },
});
</script>

<template>
  <Div :className="'infoBlock-div'">
    <Div :className="'infoBlock-icon_div'" :icon="'warning'"/>
    <Span :className="'infoBlock-span'" :color="'gray'">
      <slot></slot>
    </Span>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
