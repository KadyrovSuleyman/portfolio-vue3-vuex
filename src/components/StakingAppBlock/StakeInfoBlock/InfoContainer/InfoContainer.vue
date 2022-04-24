<script setup lang="ts">

import propsObj from '@/elements/propsObj';
import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import { useStore } from 'vuex';
import adapt from './adapter';
import InfoItem from './InfoItem/InfoItem.vue';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'infoContainer' }));

const store = useStore();
const state = computed(() => adapt(store));

const keys = computed(() => Object.keys(state.value));

</script>

<template>

  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <InfoItem :block="comp.elem" :elem="'infoItem'"
      v-for="key in keys" :key="key"
    >
      <template v-slot:header>
        {{ key }}
      </template>
      {{ state[key] }}
    </InfoItem>

  </Div>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
