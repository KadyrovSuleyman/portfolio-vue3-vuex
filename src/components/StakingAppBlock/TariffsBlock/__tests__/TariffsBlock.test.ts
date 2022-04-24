import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import { TariffT } from '@/store/tariff/types.d';
import TariffsBlock from '../TariffsBlock.vue';

jest.mock('../adapter');
jest.mock('../logic');

let store: Store<any>;
beforeEach(() => {
  store = createStore({
    state: {
      list: [
        {
          period: 30,
          apy: 103.23,
          amountMin: 100,
          amountMax: 299,
        },
        {
          period: 90,
          apy: 116.86,
          amountMin: 100,
          amountMax: 299,
        },
        {
          period: 150,
          apy: 129.97,
          amountMin: 500,
          amountMax: 1000,
        },
      ],
      selectList: {
        30: undefined,
        90: undefined,
        150: undefined,
      },
      select: (period: number) => {
        if (store.state.selectList[period] === 'true') {
          Object.keys(store.state.selectList).forEach((key) => {
            store.state.selectList[Number(key)] = undefined;
          });
          return;
        }
        Object.keys(store.state.selectList).forEach((key) => {
          store.state.selectList[Number(key)] = Number(key) === period ? 'true' : 'false';
        });
      },
    },
    mutations: {
      add: (state, item: TariffT) => { state.list.push(item); },
      delete: (state, index: number) => { state.list.splice(index, 1); },
      change: (state, index: number) => {
        state.list[index].period = 505;
        state.list[index].apy = 505;
        state.list[index].amountMin = 505;
        state.list[index].amountMax = 505;
      },
    },
  });
});

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

// ===========================
it('tariffsBlock renders', () => {
  wrapper = mount(TariffsBlock, { global: { plugins: [store] } });
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(TariffsBlock, { global: { plugins: [store] } });
  expect(wrapper.find('.tariffsBlock').classes()).toEqual(['tariffsBlock']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.tariffsBlock').classes()).toEqual([
    'tariffsBlock',
    'tariffsBlock__selected',
  ]);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.tariffsBlock').classes()).toEqual(['tariffsBlock']);
});

describe('outer store changing', () => {
  it('adding tariff', async () => {
    wrapper = mount(TariffsBlock, {
      global: { plugins: [store] },
    });

    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

    store.commit('add', {
      period: 505,
      apy: 505,
      amountMin: 505,
      amountMax: 505,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(4);
    const newTariff = wrapper.findAll('.tariffsBlock-tariffItem')[3];
    expect(newTariff.find('.tariffItem-period').text()).toBe('505 Days');
    expect(newTariff.find('.tariffItem-apy').text()).toBe('APY: 505%');
    expect(newTariff.find('.tariffItem-amount').text()).toBe('Amount: 505 - 505 TKN');
  });

  it('deleting tariff', async () => {
    wrapper = mount(TariffsBlock, {
      global: { plugins: [store] },
    });

    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

    store.commit('delete', 2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(2);

    store.commit('delete', 0);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(1);

    store.commit('delete', 0);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(0);
  });

  it('changing tariff', async () => {
    wrapper = mount(TariffsBlock, {
      global: { plugins: [store] },
    });

    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

    store.commit('change', 0);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);
    const newTariff = wrapper.findAll('.tariffsBlock-tariffItem')[0];
    expect(newTariff.find('.tariffItem-period').text()).toBe('505 Days');
    expect(newTariff.find('.tariffItem-apy').text()).toBe('APY: 505%');
    expect(newTariff.find('.tariffItem-amount').text()).toBe('Amount: 505 - 505 TKN');
  });
});

it('selecting some tariff', async () => {
  wrapper = mount(TariffsBlock, {
    global: { plugins: [store] },
  });

  const target = wrapper.findAll('.tariffsBlock-tariffItem');

  expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);
  expect(wrapper.findAll('.tariffsBlock-tariffItem__selected_true').length).toBe(0);
  expect(wrapper.findAll('.tariffsBlock-tariffItem__selected_false').length).toBe(0);

  await target[0].trigger('click');

  expect(target[0].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_true']);
  expect(target[1].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_false']);
  expect(target[2].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_false']);

  await target[0].trigger('click');
  expect(target[0].classes())
    .toStrictEqual(['tariffsBlock-tariffItem']);
  expect(target[1].classes())
    .toStrictEqual(['tariffsBlock-tariffItem']);
  expect(target[2].classes())
    .toStrictEqual(['tariffsBlock-tariffItem']);

  await target[2].trigger('click');
  expect(target[0].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_false']);
  expect(target[1].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_false']);
  expect(target[2].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_true']);

  await target[1].trigger('click');
  expect(target[0].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_false']);
  expect(target[1].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_true']);
  expect(target[2].classes())
    .toStrictEqual(['tariffsBlock-tariffItem', 'tariffsBlock-tariffItem__selected_false']);
});
