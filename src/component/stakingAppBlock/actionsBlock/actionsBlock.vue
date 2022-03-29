<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import Button from '@/element-rework/button/button.vue';
import Span from '@/element-rework/span/span.vue';

export default defineComponent({
  props: {
    state: String,
  },
  data() {
    return {
      text: this.$props.state,
      color: this.$props.state === 'Waiting' ? 'yellow-dark' : 'main',
    };
  },
  setup() {
    return {};
  },
  components: {
    Div,
    Button,
    Span,
  },
});
</script>

<template>
  <Div :className="'stakingAppBlock-actionsBlock'">

    <Button :className="'actionBlock-timeButton'" :color="'gray-dark'" >
      <Span :className="'timeButton-span'">
        00:00:09
      </Span>
    </Button>

    <Button :className="'actionBlock-mainButton'" :color="color">
      <!-- <WaitingIcon
        v-if="text === 'Waiting'"
        :className="'mainButton-waitingIcon'"
      /> -->
      <Span :className="'mainButton-span'">
        {{ text }}
      </Span>
    </Button>

    <Button :className="'actionBlock-unstakeButton'" :border="'smaller'" :color="'white'">
      <Span :className="'unstakeButton-span'">
        Unstake
      </Span>
    </Button>

  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
