<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/elements/Div/Div.vue';
import Button from '@/elements/Button/Button.vue';
import Span from '@/elements/Span/Span.vue';
import propsObj from '@/elements/propsObj';
import { useStore } from 'vuex';
import WaitingIcon from './WaitingIcon/WaitingIcon.vue';
import adaptState from './state';
import generateMainButtonProps, { generateUnstakeHandler } from './handlers';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'actionsBlock' }));

const store = useStore();
const state = computed(() => adaptState(store));
const mainButtonProps = computed(() => generateMainButtonProps(adaptState(store)));

const CALLBACK = computed(() => {
  if (!mainButtonProps.value.handler) {
    return () => ({});
  }

  return mainButtonProps.value.handler(store);
});

const unstakeClickHandler = generateUnstakeHandler(store);

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
      :onClick="CALLBACK" :disabled="state.disabled" v-if="!state.hidden"
    >
      <WaitingIcon
        v-if="state.isWaiting"
        :block="'mainButton'"
      />
      <Span :block="'mainButton'">
        {{ mainButtonProps.text }}
      </Span>
    </Button>

    <Span v-if="state.hidden" :block="comp.elem" :elem="'maxAmountSpan'">
      You have max. amount TKN
    </Span>

    <Button v-if="state.isStaked && state.isRestakeAvailable"
      :block="comp.elem" :elem="'unstakeButton'"
      :onClick="unstakeClickHandler"
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
