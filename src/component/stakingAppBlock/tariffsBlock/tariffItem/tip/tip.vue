<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';

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
  @import './style.scss';
</style>
