<script setup lang="ts">
/* eslint-disable vuejs-accessibility/mouse-events-have-key-events */
import { computed, defineComponent, ref } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import propsObj from '@/element/propsObj';
import Tip from './tip/tip.vue';

type OnClickHandlerT = (payload: MouseEvent) => void;
// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  period: String,
  apy: String,
  amount: String,

  selected: String,

  onClick: {
    type: Function,
    default: (): OnClickHandlerT => () => ({}),
  },
});

const isTipVisible = ref(false);
const comp = computed(() => ({
  elem: props.elem || 'tariffItem',
  selected: (props.mods?.selected as string) || props.selected,
}));

const showTip = () => { isTipVisible.value = true; };
const hideTip = () => { isTipVisible.value = false; };

</script>

<template>
  <Div :block="props.block" :elem="comp.elem"
    :mods="{ ...props.mods, selected: comp.selected }"
    :onClick="onClick"
  >
    <Tip :block="comp.elem" v-if="isTipVisible">
      Tip text hover
    </Tip>

    <Span :block="comp.elem" :elem="'period'">
      {{ period }}
    </Span>

    <Div :block="comp.elem" :elem="'apyDiv'">
      <Span :block="comp.elem" :elem="'apy'">
        APY: {{ apy }}
      </Span>
      <Div
        :block="comp.elem" :elem="'question'"
        :icon="'question'" @mouseenter="showTip" @mouseleave="hideTip"/>
    </Div>

    <Span :block="comp.elem" :elem="'amount'">
      Amount: {{ amount }}
    </Span>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
