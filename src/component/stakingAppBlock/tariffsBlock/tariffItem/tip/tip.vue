<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import Span from '@/element-rework/span/span.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Div, Span },
});
</script>

<template>
  <Div :className="'tariffItem-tip_div'">
    <Div :className="'tip_div-triangle'" />
    <Div :className="'tip_div-div'" :border="'smaller'">
      <Span :className="'tip_div-span'" :color="'white'">
        Tip text hover
      </Span>
    </Div>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
