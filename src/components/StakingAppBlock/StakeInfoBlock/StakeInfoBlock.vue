<script setup lang="ts">

import propsObj from '@/elements/propsObj';
import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Span from '@/elements/Span/Span.vue';
import { useStore } from 'vuex';
import InfoContainer from './InfoContainer/InfoContainer.vue';
import adaptState from './state';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'stakeInfoBlock' }));

const store = useStore();
const state = computed(() => adaptState(store));

</script>

<template>

  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <Div :block="comp.elem">
      <Span :block="comp.elem" :elem="'incomeSpan'">
        {{ state.income }}
      </Span>
      <Span :block="comp.elem" :elem="'promtSpan'">
        TKN earned
      </Span>
    </Div>

    <InfoContainer :block="comp.elem" />

  </Div>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
