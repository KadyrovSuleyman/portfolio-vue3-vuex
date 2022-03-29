<script lang="ts">
import { defineComponent } from 'vue';
import Span from '@/element-rework/span/span.vue';
import Div from '@/element-rework/div/div.vue';

export default defineComponent({
  components: {
    Span,
    Div,
  },
});
</script>

<template>
  <Div :className="'infoBlock-div'" :border="'medium'">
    <Div :className="'infoBlock-icon_div'" :icon="'warning'"/>
    <Span :className="'infoBlock-span'" :color="'text-subtext'">
      <slot></slot>
    </Span>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
