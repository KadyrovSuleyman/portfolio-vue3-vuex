<script setup lang="ts">

import { computed, ref } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import TariffItem from './tariffItem/tariffItem.vue';
import adapt from './adapter';
import { clickHandlerToClosure, selectMap } from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'tariffsBlock' }));

const store = useStore();

const { tariffsList } = adapt(store);

const map = selectMap(tariffsList);
// const clickHandler = (payload: MouseEvent) => {
//   clickHandlerToClosure(map.value.value, payload);
// console.log(map.value.value);
// console.log(map.value.value['30 Days']);
// };

// const clickHandler = (payload: MouseEvent) => {
//   clickHandlerToClosure(tariffsList, payload);
//   console.log(tariffsList);
// };

//  @click="clickHandler" :selected="map.value[period]"

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <TariffItem v-for="({ period, apy, amount }) in tariffsList" :key="period"
      :block="comp.elem" :period="period" :apy="apy"
      :amount="amount"
    />

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
