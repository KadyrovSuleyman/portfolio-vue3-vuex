import { ref } from 'vue';
import { Store } from 'vuex';

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

export type SelectListT = {
  [name: string]: string | undefined,
};

export const selectList = ref<SelectListT>({
  '30 Days': undefined,
  '90 Days': undefined,
  '150 Days': undefined,
});

// ======================================
const adapt = (store: Store<any>) => ({
  // tariffsList: store.state.list,
  // selectList: store.state.selectList,

  tariffsList: tariffsList.value,
  selectList: selectList.value,
});

export default adapt;
