<script setup lang="ts">

import { computed, ref } from 'vue';
import Div from '@/element/div/div.vue';
import propsObj from '@/element/propsObj';
import Input from '@/element/input/input.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'calculator' }));

const text = ref('');
const onInput = (payload: KeyboardEvent) => {
  text.value = (payload.target as HTMLInputElement).value;
};

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">
    <Input :text="text" :onInput="onInput" />
    {{ text }}
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
