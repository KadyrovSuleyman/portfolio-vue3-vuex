<script setup lang="ts">

import { reactive } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';

interface PropsI {
  block?: string,
  elem?: string,
  mods?: Record<string, unknown>,

  onClick?: (payload: MouseEvent) => void,
}
// eslint-disable-next-line no-undef
const props = defineProps<PropsI>();
const {
  block, elem, mods, onClick,
} = reactive({
  ...props,
  elem: props.elem || 'connectBlock',
});

</script>

<template>
  <Div :block="block" :elem="elem" :mods="mods">
    <Button :block="elem" @click="onClick" :mods="mods">
      Connect wallet
    </Button>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
