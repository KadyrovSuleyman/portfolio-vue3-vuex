<script lang="ts">
/* eslint-disable vuejs-accessibility/mouse-events-have-key-events */
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import Span from '@/element-rework/span/span.vue';
import Tip from './tip/tip.vue';

export default defineComponent({
  props: {
    period: String,
    apy: String,
    amount: String,
  },
  data() {
    return {
      isTipVisible: false,
    };
  },
  methods: {
    showTip() {
      this.isTipVisible = true;
    },
    hideTip() {
      this.isTipVisible = false;
    },
  },
  components: { Tip, Div, Span },
});
</script>

<template>
  <Div :className="'tariffsBlock-tariffItem'">
    <Tip v-if="isTipVisible"/>
    <Span :className="'tariffItem-period_span'">
      {{ period }}
    </Span>
    <Div :className="'tariffItem-apy_div'">
      <Span :className="'tariffItem-apy_span'" :color="'red'" :font="'montserrat'">
        APY: {{ apy }}
      </Span>
      <Div
        :className="'tariffItem-question_div'"
        :icon="'question'" @mouseenter="showTip" @mouseleave="hideTip"/>
    </Div>
    <Span :className="'tariffItem-amount_span'" :color="'subtext'">
      Amount: {{ amount }}
    </Span>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
