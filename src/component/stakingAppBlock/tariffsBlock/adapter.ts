import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';

export type TariffItemT = {
  period: string,
  apy: string,
  amount: string,
}

export const tariffsList = ref<TariffItemT[]>([
  {
    period: '30 Days',
    apy: '103,23%',
    amount: '100 - 299 TKN',
  },
  {
    period: '90 Days',
    apy: '116,86%',
    amount: '100 - 299 TKN',
  },
  {
    period: '150 Days',
    apy: '129,97%',
    amount: '500 - 1000 TKN',
  },
]);

// const adapt = (store: Store<any>) => ({
//   // tariffsList: computed(() => store.state.list),

//   tariffsList: tariffsList.value,
// });

const adapt = (store: Store<any>) => {
  console.log(store.state.list);
  store.commit('change', 1);
  return {
    tariffsList: store.state.list,

    // tariffsList: tariffsList.value,
  };
};

export default adapt;
