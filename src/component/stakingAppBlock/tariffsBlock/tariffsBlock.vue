<script lang="ts">
import { defineComponent } from 'vue';
import Div from '@/element-rework/div/div.vue';
import TariffItem from './tariffItem/tariffItem.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { TariffItem, Div },
});
</script>

<template>
  <Div :className="'stakingAppBlock-tariffsBlock'">
    <TariffItem :period="'30 Days'" :apy="'103,23%'" :amount="'100 - 299 TKN'"/>
    <TariffItem :period="'90 Days'" :apy="'116,86%'" :amount="'100 - 299 TKN'"/>
    <TariffItem :period="'150 Days'" :apy="'129,97%'" :amount="'500 - 1000 TKN'"/>
  </Div>
</template>

<style lang="scss">
  @use '.' as *;
</style>
