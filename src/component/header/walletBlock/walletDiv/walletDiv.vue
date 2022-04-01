<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import AddressBlock from './addressBlock/addressBlock.vue';
import adapt from './adapter';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletDiv' }));

const store = useStore();
const { address, balance } = adapt(store);

const todo = () => { console.warn('need to do copy func'); };

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods" >
    <AddressBlock :block="comp.elem" :onClick="todo">
      {{ address }}
    </AddressBlock>
    <Span :block="comp.elem">
      {{ balance }}
    </Span>
    <Button :block="comp.elem" :icon="'coin'" />
    <Button :block="comp.elem" :icon="'chevron'"/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
