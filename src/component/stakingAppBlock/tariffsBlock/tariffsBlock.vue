<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element/div/div.vue';
import TariffItem from './tariffItem/tariffItem.vue';

export default defineComponent({
  props: {
    block: String,
    elem: String,
  },
  data() {
    return {
      parentName: this.$props.block,
      name: this.$props.elem || 'tariffsBlock',
    };
  },
  components: { TariffItem, Div },
});
</script>

<template>
  <Div :block="parentName" :elem="name">
    <TariffItem :block="name" :period="'30 Days'" :apy="'103,23%'" :amount="'100 - 299 TKN'"/>
    <TariffItem :block="name" :period="'90 Days'" :apy="'116,86%'" :amount="'100 - 299 TKN'"/>
    <TariffItem :block="name" :period="'150 Days'" :apy="'129,97%'" :amount="'500 - 1000 TKN'"/>
  </Div>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
