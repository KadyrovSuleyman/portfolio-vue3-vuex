<script setup lang="ts">

import { computed } from 'vue';
import { useStore } from 'vuex';
import propsObj from '@/element/propsObj';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import { adapt } from './adapter';
import BaseNotification from '../BaseNotification/BaseNotification.vue';
import { createCloseHandler, createNotificationClickHandler } from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({
  ...propsObj,
  target: String,
});
const comp = computed(() => ({ elem: props.elem || 'transactionConfirmed' }));

const store = useStore();
const state = computed(() => adapt(store));

const closeHandler = createCloseHandler(state);
const notificationClickHandler = createNotificationClickHandler(state);

</script>

<template>

<Teleport :to="props.target">
  <transition :name="comp.elem">
    <BaseNotification :block="comp.elem" :mods="props.mods"
      v-if="state.isShown" :close-handler="closeHandler"
    >
      <Button :block="comp.elem" @click="notificationClickHandler">
        <Span :block="comp.elem">
          Transaction confirmed! Click here to see it
        </Span>
      </Button>
    </BaseNotification>
  </transition>
</Teleport>

</template>

<style lang="scss" scoped>
  @use 'styles' as *;
</style>
