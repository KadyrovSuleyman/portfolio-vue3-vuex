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

    block: String,
    elem: String,
  },
  data() {
    return {
      isTipVisible: false,

      parentName: this.$props.block,
      name: this.$props.elem || 'tariffItem',
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
  <Div :block="parentName" :elem="name">
    <Tip :block="name" v-if="isTipVisible"/>
    <Span :block="name" :elem="'period'">
      {{ period }}
    </Span>
    <Div :block="name" :elem="'apyDiv'">
      <Span :block="name" :elem="'apy'">
        APY: {{ apy }}
      </Span>
      <Div
        :block="name" :elem="'question'"
        :icon="'question'" @mouseenter="showTip" @mouseleave="hideTip"/>
    </Div>
    <Span :block="name" :elem="'amount'">
      Amount: {{ amount }}
    </Span>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
