<script setup lang="ts">

import { computed } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import propsObj from '@/element/propsObj';
import { useStore } from 'vuex';
import WaitingIcon from './waitingIcon/waitingIcon.vue';
import adapt from './adapter';
import generateMainButtonText from './logic';

// eslint-disable-next-line no-undef
const props = defineProps({ ...propsObj });
const comp = computed(() => ({ elem: props.elem || 'actionsBlock' }));

const store = useStore();
const state = computed(() => adapt(store));
const mainButtonText = computed(() => generateMainButtonText(adapt(store)));

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
      :mods="{ waiting: state.isWaiting }"
    >
      <WaitingIcon
        v-if="state.isWaiting"
        :block="'mainButton'"
      />
      <Span :block="'mainButton'">
        {{ mainButtonText }}
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

<style lang="scss">
  @use 'styles' as *;
</style>
