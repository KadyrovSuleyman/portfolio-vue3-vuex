<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import TariffItem from './tariffItem/tariffItem.vue';
import adapt from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'tariffsBlock' }));

const store = useStore();
const { tariffsList } = adapt(store);

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
