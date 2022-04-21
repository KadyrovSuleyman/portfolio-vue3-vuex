<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import { useStore } from 'vuex';
import PromtInput from './promtInput/promtInput.vue';
import { isValidInput, validate, correctState } from './logic';
import adapt from './adapter';
import { inputValueWatcher } from './watchers';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const store = useStore();
const state = computed(() => adapt(store));

const errorText = computed(() => validate(state.value.text, state.value.minValue));
const correct = computed(() => correctState(state.value.text, state.value.minValue));

const onInput = (payload: KeyboardEvent) => {
  const target = (payload.target as HTMLInputElement);
  if (!isValidInput(target.value)) {
    target.value = state.value.text;
    return;
  }

  if (Number(target.value) > state.value.maxValue) {
    target.value = String(state.value.maxValue);
  }

  state.value.setText(target.value);
};

const onButtonClick = () => {
  state.value.setText(String(state.value.maxValue));
};

inputValueWatcher(state);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <PromtInput :block="comp.elem" :promtText="errorText" :correct="correct"
      :text="state.text" :onInput="onInput" :disabled="state.disabled"
    />
    <Button :block="comp.elem" :onClick="onButtonClick" :disabled="state.disabled">
      Max
    </Button>

    <Div :block="comp.elem">
      <Span :block="comp.elem" :elem="'periodSpan'">
        Reward {{ state.period ? `for ${state.period} Days` : ''}}:
      </Span>
      <Span v-if="correct === 'true'" :block="comp.elem" :elem="'rewardSpan'">
        {{ state.reward }} TKN
      </Span>
    </Div>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
