<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import propsObj from '@/elements/propsObj';
import { useStore } from 'vuex';
import adaptState from './state';
import WalletsListItem from './WalletsListItem/WalletsListItem.vue';
import { clickHandlerGenerator } from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletsList' }));

const store = useStore();
const state = computed(() => adaptState(store));

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
