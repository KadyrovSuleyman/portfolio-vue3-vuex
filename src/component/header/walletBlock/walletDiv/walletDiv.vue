<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import propsObj from '@/element/propsObj';
import AddressBlock from './addressBlock/addressBlock.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'walletDiv' }));

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods" >
    <AddressBlock :block="comp.elem">zxc</AddressBlock>
    <Span :block="comp.elem">
      0.029 BUSD
    </Span>
    <Button :block="comp.elem" :icon="'coin'" />
    <Button :block="comp.elem" :icon="'chevron'"/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
