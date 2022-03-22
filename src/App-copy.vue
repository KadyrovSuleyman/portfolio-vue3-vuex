<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import types from './store/mutation-types';

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      count: computed(() => store.state.count),
      // increment: () => store.commit(INCREMENT, 10),
      increment: () => store.dispatch(types.INCREMENT),
    };
  },
});
</script>

<template>
  {{ count }}
  <button @click="increment">+</button>
</template>
