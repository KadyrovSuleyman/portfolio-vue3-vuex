import { createStore, Store } from 'vuex';
import { TariffItemT } from '../adapter';
import { selectMap, selectToClosure } from '../logic';

let store: Store<any>;

beforeEach(() => {
  store = createStore({
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
});
afterEach(() => {
  store = createStore({});
});

it('selectMap', () => {
  const map = selectMap(store.state.list);

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

  store.commit('change', 0);
  expect(map.value).toStrictEqual({
    'changed period': undefined,
    '150 Days': undefined,
    'scum period': undefined,
  });

  map.value['changed period'] = 'true';
  map.value['scum period'] = 'false';
  expect(map.value).toStrictEqual({
    'changed period': 'true',
    '150 Days': undefined,
    'scum period': 'false',
  });

  store.commit('add', {
    period: 'scum period 2',
    apy: 'scum apy 2',
    amount: 'scum amount 2',
  });
  expect(map.value).toStrictEqual({
    'changed period': undefined,
    '150 Days': undefined,
    'scum period': undefined,
    'scum period 2': undefined,
  });
});

it('selectToClosure', () => {
  const map = selectMap(store.state.list);

  expect(map.value).toStrictEqual({
    '30 Days': undefined,
    '90 Days': undefined,
    '150 Days': undefined,
  });

  selectToClosure(map.value, '30 Days');
  expect(map.value).toStrictEqual({
    '30 Days': 'true',
    '90 Days': 'false',
    '150 Days': 'false',
  });

  selectToClosure(map.value, '90 Days');
  expect(map.value).toStrictEqual({
    '30 Days': 'false',
    '90 Days': 'true',
    '150 Days': 'false',
  });

  selectToClosure(map.value, '90 Days');
  expect(map.value).toStrictEqual({
    '30 Days': undefined,
    '90 Days': undefined,
    '150 Days': undefined,
  });

  selectToClosure(map.value, '150 Days');
  expect(map.value).toStrictEqual({
    '30 Days': 'false',
    '90 Days': 'false',
    '150 Days': 'true',
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
});
