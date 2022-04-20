<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import TariffItem from './tariffItem/tariffItem.vue';
import adapt from './adapter';
import { clickHandlerGenerator } from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'tariffsBlock' }));

const store = useStore();
const state = computed(() => adapt(store));

const clickHandler = clickHandlerGenerator({
  className: `${props.block ? `${props.block}-` : ''}${comp.value.elem}`,
  store,
});

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <TariffItem v-for="({ period, apy, amountMin, amountMax }) in state.tariffsList" :key="period"
      :block="comp.elem" :period="period" :apy="apy"
      :amountMin="amountMin" :amountMax="amountMax"
      :onClick="clickHandler" :selected="state.selectList[period]"
    />

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
