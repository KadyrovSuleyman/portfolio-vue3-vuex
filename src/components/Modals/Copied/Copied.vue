<script setup lang="ts">

import { computed } from 'vue';
import { useStore } from 'vuex';
import propsObj from '@/elements/propsObj';
import Button from '@/elements/Button/Button.vue';
import Span from '@/elements/Span/Span.vue';
import { adaptState } from './state';
import BaseNotification from '../BaseNotification/BaseNotification.vue';
import createCloseHandler from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  target: String,
});
const comp = computed(() => ({ elem: props.elem || 'copied' }));

const store = useStore();
const state = computed(() => adaptState(store));

const closeHandler = createCloseHandler(state);

</script>

<template>

<Teleport :to="props.target">
  <transition :name="comp.elem">
    <BaseNotification :block="comp.elem" :mods="props.mods"
      v-if="state.isShown" :close-handler="closeHandler"
      :duration="1000"
    >
      <Span :block="comp.elem">
        Copied!
      </Span>
    </BaseNotification>
  </transition>
</Teleport>

</template>

<style lang="scss" scoped>
  @use 'styles' as *;
</style>
