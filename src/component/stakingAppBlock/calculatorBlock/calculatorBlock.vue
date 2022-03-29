<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import Calculator from './calculator/calculator.vue';
import InfoBlock from './infoBlock/infoBlock.vue';

export default defineComponent({
  props: {
    isAuthorized: Boolean,

    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'calculatorBlock',
    };
  },
  components: {
    Calculator,
    InfoBlock,
    Div,
  },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <Calculator :block="name" v-if="isAuthorized" />
    <InfoBlock :block="name" v-else >
      To perform actions on the page, connect your wallet
    </InfoBlock>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
