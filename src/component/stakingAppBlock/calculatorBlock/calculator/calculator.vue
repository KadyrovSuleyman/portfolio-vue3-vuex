<script setup lang="ts">

import { computed, ref } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import PromtInput from './promtInput/promtInput.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const text = ref('');
const onInput = (payload: KeyboardEvent) => {
  text.value = (payload.target as HTMLInputElement).value;
};

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <PromtInput :block="comp.elem" :promtText="'Error proper amount'" :correct="'false'"/>
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
