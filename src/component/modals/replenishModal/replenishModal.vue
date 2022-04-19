<script setup lang="ts">

import { computed, ref, VueElement } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import { adapt, generateCloseHandler, generateReplenishConfirmHandler } from './adapter';
import Calculator from './calculator/calculator.vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  target: String,
});
const comp = computed(() => ({ elem: props.elem || 'replenishModal' }));

const store = useStore();
const state = computed(() => adapt(store));
const closeHandler = generateCloseHandler(store);
const replenishConfirmHandler = generateReplenishConfirmHandler(store);

</script>

<template>

<Teleport :to="props.target">
  <transition :name="comp.elem">
      <Div :block="props.block" :elem="comp.elem" :mods="props.mods"
        v-if="state.isShown"
      >
        <Span :block="comp.elem" :elem="'header'">
          Replenish
        </Span>
        <Div :block="comp.elem">
          <Span :block="comp.elem">
            Max. amount =
          </Span>
          <Span :block="comp.elem" :elem="'tkn-span'">
            {{ state.maxAmount }} TKN
          </Span>
        </Div>
        <Div :block="comp.elem">
          <Span :block="comp.elem">
            Available amount =
          </Span>
          <Span :block="comp.elem" :elem="'tkn-span'">
            {{ state.availableAmount }} TKN
          </Span>
        </Div>

        <Calculator :block="comp.elem" />

        <Button :block="comp.elem" :elem="'replenish-button'"
          :onClick="replenishConfirmHandler"
        >
          <Span :block="'replenish-button'" :elem="'span'">
            Replenish
          </Span>
        </Button>

        <Button :block="comp.elem" :elem="'close-button'" :onClick="closeHandler" :icon="'cross'" />
      </Div>
  </transition>

  <transition :name="comp.elem">
  <Div :elem="'background'"
        v-if="state.isShown"
      />
  </transition>
</Teleport>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
