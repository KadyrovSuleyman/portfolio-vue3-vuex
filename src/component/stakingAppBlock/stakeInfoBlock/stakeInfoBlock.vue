<script setup lang="ts">

import propsObj from '@/element/propsObj';
import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import { useStore } from 'vuex';
import InfoContainer from './infoContainer/infoContainer.vue';
import adapt from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'stakeInfoBlock' }));

const store = useStore();
const state = computed(() => adapt(store));

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
