<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import adapt from './adapter';
import WalletsListItem from './walletsListItem/walletsListItem.vue';
import { clickHandlerGenerator } from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletsList' }));

const store = useStore();
const state = computed(() => adapt(store));

const clickHandler = clickHandlerGenerator(
  store,
  `${props.block ? `${props.block}-` : ''}${comp.value.elem}`,
);

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods"
    :onClick="clickHandler"
  >

    <WalletsListItem v-for="{ name, icon } in state.walletsList" :key="name"
      :icon="icon" :block="comp.elem"
    >
      {{ name }}
    </WalletsListItem>

  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
