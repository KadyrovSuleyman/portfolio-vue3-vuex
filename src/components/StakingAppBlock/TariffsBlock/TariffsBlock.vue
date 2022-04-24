<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';
import { useStore } from 'vuex';
import TariffItem from './TariffItem/TariffItem.vue';
import adaptState from './state';
import createClickHandler from './handlers';
// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'tariffsBlock' }));

const store = useStore();
const state = computed(() => adaptState(store));

const clickHandler = createClickHandler({
  className: `${props.block ? `${props.block}-` : ''}${comp.value.elem}`,
  state,
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
