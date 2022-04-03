import { TariffItemT } from '@/component/stakingAppBlock/tariffsBlock/adapter';
import { createLogger, createStore } from 'vuex';
import types from './mutation-types';

// const debug = process.env.NODE_ENV !== 'production';

// export default createStore({
//   state: {
//     count: 0,
//     str: 'a',
//   },
//   getters: {
//   },
//   mutations: {
//     [types.INCREMENT]: (state, n = 1) => { state.count += n; },
//     change: (state) => { state.str += 'a'; },
//   },
//   actions: {
//     [types.INCREMENT]: ({ commit }, n: number) => setTimeout(() => {
//       commit(types.INCREMENT, n);
//     }, 1000),
//   },
//   modules: {
//   },

//   plugins: [createLogger()],
// });

export default createStore({
  state: {
    list: [
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
    ],
  },
  mutations: {
    add: (state, item: TariffItemT) => { state.list.push(item); },
    delete: (state, index: number) => { state.list.splice(index, 1); },
    change: (state, index: number) => {
      state.list[index].period = 'changed period';
      state.list[index].apy = 'changed apy';
      state.list[index].amount = 'changed amount';
    },
  },
});
