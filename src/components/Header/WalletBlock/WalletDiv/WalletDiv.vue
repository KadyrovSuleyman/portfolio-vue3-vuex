<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Button from '@/elements/Button/Button.vue';
import Span from '@/elements/Span/Span.vue';
import propsObj from '@/elements/propsObj';
import { useStore } from 'vuex';
import AddressBlock from './AddressBlock/AddressBlock.vue';
import { adaptState } from './state';
import reductAddress from './logic';
import createCopyClickHandler from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletDiv' }));

const store = useStore();
const state = computed(() => adaptState(store));

const copyClickHandler = createCopyClickHandler(state);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods" >
    <AddressBlock :block="comp.elem" :onClick="copyClickHandler">
      {{ reductAddress(state.address) }}
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
