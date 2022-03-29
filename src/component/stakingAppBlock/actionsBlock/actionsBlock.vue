<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Button from '@/element/button/button.vue';
import Span from '@/element/span/span.vue';
import WaitingIcon from './waitingIcon/waitingIcon.vue';

export default defineComponent({
  props: {
    state: String,

    block: String,
    elem: String,
  },
  data() {
    return {
      text: this.$props.state,

      parentName: this.$props.block,
      name: this.$props.elem || 'actionsBlock',
    };
  },
  setup() {
    return {};
  },
  components: {
    Div,
    Button,
    Span,
    WaitingIcon,
  },
});
</script>

<template>
  <Div :block="parentName" :elem="name">

    <Button :block="name" :elem="'timeButton'">
      <Span :block="'timeButton'">
        00:00:09
      </Span>
    </Button>

    <Button :block="name" :elem="'mainButton'"
      :mods="{ waiting: text === 'Waiting' }"
    >
      <WaitingIcon
        v-if="text === 'Waiting'"
        :block="'mainButton'"
      />
      <Span :block="'mainButton'">
        {{ text }}
      </Span>
    </Button>

    <Button :block="name" :elem="'unstakeButton'">
      <Span :block="'unstakeButton'">
        Unstake
      </Span>
    </Button>

  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
