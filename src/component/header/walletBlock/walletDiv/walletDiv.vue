<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import AddressBlock from './addressBlock/addressBlock.vue';
import adapt, { generateCopyClickHandler } from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletDiv' }));

const store = useStore();
const state = computed(() => adapt(store));

const copyClickHandler = generateCopyClickHandler(store);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods" >
    <AddressBlock :block="comp.elem" :onClick="copyClickHandler">
      {{ state.address }}
    </AddressBlock>
    <Span :block="comp.elem">
      {{ state.balance }} {{ state.coinAbbreviation }}
    </Span>

    <Button :block="comp.elem" :icon="'coin'">
      <img :src="state.coinLink" :alt="state.coinName">
    </Button>

    <Button :block="comp.elem" :icon="'chevron'"/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
