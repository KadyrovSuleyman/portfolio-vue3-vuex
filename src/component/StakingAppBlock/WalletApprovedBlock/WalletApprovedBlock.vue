<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import propsObj from '@/element/propsObj';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletApprovedBlock' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <Span :block="comp.elem">
      Wallet approved
    </Span>
    <Div :block="comp.elem" :icon="'check'"/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
