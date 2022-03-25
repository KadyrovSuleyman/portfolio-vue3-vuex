<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Span from '@/element/span/span.vue';
import Button from '@/element/button/button.vue';

export default defineComponent({
  data() {
    return {};
  },
  setup() {
    return {};
  },
  components: {
    Div,
    Span,
    Button,
  },
});
</script>

<template>
  <Div :className="'stakingAppBlock-actionsBlock'">
    <Button :className="'actionBlock-TimeButton'" :color="'gray-dark'" >
      <Span :className="'TimeButton-span'">
        00:00:09
      </Span>
    </Button>
  </Div>
</template>

<style lang="scss">
  @import './style.scss';
</style>
