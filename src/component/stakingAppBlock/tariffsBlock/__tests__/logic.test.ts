import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import { TariffItemT } from '../adapter';
import { selectMap } from '../logic';

const listTemplate = [
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
];

let store: Store<any>;

beforeEach(() => {
  store = createStore({
    state: {
      list: [...listTemplate],
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
});
afterEach(() => {
  store = createStore({});
});

it('selectMap', () => {
  // const map = ref(selectMap(store.state.list)).value;
  const map = computed(() => selectMap(store.state.list));

  expect(map.value).toStrictEqual({
    '30 Days': undefined,
    '90 Days': undefined,
    '150 Days': undefined,
  });

  store.commit('add', {
    period: 'scum period',
    apy: 'scum apy',
    amount: 'scum amount',
  });
  expect(map.value).toStrictEqual({
    '30 Days': undefined,
    '90 Days': undefined,
    '150 Days': undefined,
    'scum period': undefined,
  });

  store.commit('delete', 0);
  expect(map.value).toStrictEqual({
    '90 Days': undefined,
    '150 Days': undefined,
    'scum period': undefined,
  });
});
