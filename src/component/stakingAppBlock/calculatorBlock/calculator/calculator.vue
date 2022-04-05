<script setup lang="ts">

import { computed, ref } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import PromtInput from './promtInput/promtInput.vue';
import { isCorrectInput, validate } from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const text = ref('');
const errorText = computed(() => validate(text.value));
const correct = computed(() => {
  if (text.value === '') {
    return '';
  }

  if (validate(text.value) !== '') {
    return 'false';
  }

  return 'true';
});

const onInput = (payload: KeyboardEvent) => {
  const target = (payload.target as HTMLInputElement);
  if (!isCorrectInput(target.value)) {
    target.value = text.value;
    return;
  }

  text.value = target.value;

  validate(text.value);
};

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <PromtInput :block="comp.elem" :promtText="errorText" :correct="correct"
      :text="text" :onInput="onInput"
    />
    <Button :block="comp.elem">Max</Button>

    <Div :block="comp.elem">
      <Span :block="comp.elem" :elem="'periodSpan'">
        Reward for 30 days:
      </Span>
      <Span :block="comp.elem" :elem="'rewardSpan'">
        400 TKN
      </Span>
    </Div>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
