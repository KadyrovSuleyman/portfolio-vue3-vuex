<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/index.vue';
import Span from '@/element-rework/span/index.vue';
import Button from '@/element-rework/button/index.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Div, Span, Button },
});
</script>

<template>
  <Div :className="'walletDiv-addressBlock'" :border="'small'">
    <Span :className="'addressBlock-span'" :color="'yellow-dark'">
      0хCb99...8EBb
    </Span>
    <Button :className="'addressBlock-button'" :icon="'copy'" />
  </Div>

</template>

<style lang="scss">
  @use '.' as *;
</style>
