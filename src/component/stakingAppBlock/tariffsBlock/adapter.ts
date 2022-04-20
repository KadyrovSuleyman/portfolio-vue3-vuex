import { ref } from 'vue';
import { Store } from 'vuex';
import { TariffT } from '@/store/tariff/types.d';

// export type TariffItemT = {
//   period: string,
//   apy: string,
//   amount: string,
// }

// export const tariffsList = ref<TariffItemT[]>([
//   {
//     period: '30 Days',
//     apy: '103,23%',
//     amount: '100 - 299 TKN',
//   },
//   {
//     period: '90 Days',
//     apy: '116,86%',
//     amount: '100 - 299 TKN',
//   },
//   {
//     period: '150 Days',
//     apy: '129,97%',
//     amount: '500 - 1000 TKN',
//   },
// ]);

// export type SelectListT = {
//   [name: string]: string | undefined,
// };

// export const selectList = ref<SelectListT>({
//   '30 Days': undefined,
//   '90 Days': undefined,
//   '150 Days': undefined,
// });

// export type SelectListT = {
//   [period: number]: string | undefined,
// };

// export const selectList = ref<SelectListT>({
//   30: undefined,
//   90: undefined,
//   150: undefined,
// });

// ======================================
const adapt = (store: Store<any>) => ({
  tariffsList: store.state.tariff.list,
  selectList: store.getters['tariff/selectedList'],

  // tariffsList: tariffsList.value,
  // selectList: selectList.value,
});

export default adapt;
