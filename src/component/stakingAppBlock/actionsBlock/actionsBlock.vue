<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import WaitingIcon from './waitingIcon/waitingIcon.vue';
import adapt from './adapter';
import generateMainButtonProps from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'actionsBlock' }));

const store = useStore();
const state = computed(() => adapt(store));
const mainButtonProps = computed(() => generateMainButtonProps(adapt(store)));

const CALLBACK = computed(() => {
  if (!mainButtonProps.value.handler) {
    return () => ({});
  }

  return mainButtonProps.value.handler(store);
});

</script>

<template>
  <Div :block="props.block" :elem="comp.elem" :mods="props.mods">

    <Button v-if="state.isStaked && !state.isRestakeAvailable"
      :block="comp.elem" :elem="'timeButton'"
    >
      <Span :block="'timeButton'">
        {{ state.restakeCountdown }}
      </Span>
    </Button>

    <Button :block="comp.elem" :elem="'mainButton'"
      :mods="{ waiting: state.isWaiting, disabled: state.disabled }"
      :onClick="CALLBACK" :disabled="state.disabled"
    >
      <WaitingIcon
        v-if="state.isWaiting"
        :block="'mainButton'"
      />
      <Span :block="'mainButton'">
        {{ mainButtonProps.text }}
      </Span>
    </Button>

    <Button v-if="state.isStaked && state.isRestakeAvailable"
      :block="comp.elem" :elem="'unstakeButton'"
    >
      <Span :block="'unstakeButton'">
        Unstake
      </Span>
    </Button>

  </Div>
</template>

<style lang="scss" scoped>
  @use 'styles' as *;
</style>
