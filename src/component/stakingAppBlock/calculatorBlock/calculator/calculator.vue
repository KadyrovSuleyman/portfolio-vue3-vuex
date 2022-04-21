<script setup lang="ts">

import { computed, reactive, ref } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import { useStore } from 'vuex';
import PromtInput from './promtInput/promtInput.vue';
import {
  isValidInput, validate, correctState, calculateReward,
} from './logic';
import adapt from './adapter';
import { inputValueWatcher } from './watchers';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const store = useStore();
const state = computed(() => adapt(store));

const text = ref('');
const errorText = computed(() => validate(text.value, state.value));
const correct = computed(() => correctState(text.value, state.value));

const onInput = (payload: KeyboardEvent) => {
  const target = (payload.target as HTMLInputElement);
  if (!isValidInput(target.value)) {
    target.value = text.value;
    return;
  }

  if (Number(target.value) > state.value.maxValue) {
    target.value = String(state.value.maxValue);
  }

  text.value = target.value;
};

const onButtonClick = () => {
  text.value = String(state.value.maxValue);
};

const reward = computed(() => calculateReward(Number(text.value), state.value));

inputValueWatcher(state, text);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <PromtInput :block="comp.elem" :promtText="errorText" :correct="correct"
      :text="text" :onInput="onInput" :disabled="state.disabled"
    />
    <Button :block="comp.elem" :onClick="onButtonClick" :disabled="state.disabled">
      Max
    </Button>

    <Div :block="comp.elem">
      <Span :block="comp.elem" :elem="'periodSpan'">
        Reward {{ state.period ? `for ${state.period} Days` : ''}}:
      </Span>
      <Span v-if="correct === 'true'" :block="comp.elem" :elem="'rewardSpan'">
        {{ reward }} TKN
      </Span>
    </Div>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
