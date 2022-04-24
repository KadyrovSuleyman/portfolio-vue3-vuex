<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';
import Button from '@/elements/Button/Button.vue';
import Span from '@/elements/Span/Span.vue';
import { useStore } from 'vuex';
import PromtInput from './PromtInput/PromtInput.vue';
import { validate, correctState } from './logic';
import adaptState from './state';
import { inputValueWatcher } from './watchers';
import { createMaxButtonClickHandler, createOnInputHandler, createOnKeyupHandler } from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const store = useStore();
const state = computed(() => adaptState(store));

const errorText = computed(() => validate(state.value.text, state.value.minValue));
const correct = computed(() => correctState(state.value.text, state.value.minValue));

const promtInput = ref(null) as any;

const onButtonClick = ref<() => void>();
onMounted(() => {
  onButtonClick.value = createMaxButtonClickHandler(state, promtInput.value.input.element);
});
const onInput = createOnInputHandler(state);
const onKeyup = createOnKeyupHandler(state);

inputValueWatcher(state);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <PromtInput :block="comp.elem" :promtText="errorText" :correct="correct" ref="promtInput"
      :text="state.text" :onInput="onInput" :disabled="state.disabled" :onKeyup="onKeyup"
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
