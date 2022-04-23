<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import { useStore } from 'vuex';
import PromtInput from './promtInput/promtInput.vue';
import {
  isValidInput, validate, correctState,
} from './logic';
import adapt from './adapter';
import { createMaxButtonClickHandler, createOnInputHandler, createOnKeyupHandler } from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  value: String,
  setValue: {
    type: Function,
    default: () => ({}),
  },
});
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const errorText = computed(() => validate(props.value || ''));
const correct = computed(() => correctState(props.value || ''));

const store = useStore();
const state = computed(() => adapt(store, props));

const promtInput = ref(null) as any;

const onButtonClick = ref();
const onKeyup = ref();
onMounted(() => {
  onButtonClick.value = createMaxButtonClickHandler(state, promtInput.value.input.element);
  onKeyup.value = createOnKeyupHandler(state, promtInput.value.input.element);
});
const onInput = createOnInputHandler(state);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <PromtInput :block="comp.elem" :promtText="errorText" :correct="correct"
      :text="props.value" :onInput="onInput" :placeholder="'0'" ref="promtInput"
      :onKeyup="onKeyup"
    />
    <Button :block="comp.elem" :onClick="onButtonClick">Max</Button>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
