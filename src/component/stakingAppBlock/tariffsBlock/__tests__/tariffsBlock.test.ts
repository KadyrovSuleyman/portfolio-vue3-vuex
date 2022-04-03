import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import TariffsBlock from '../tariffsBlock.vue';
import { TariffItemT } from '../adapter';

let wrapper = mount(TariffsBlock, { global: { plugins: [createStore({})] } });
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('tariffsBlock renders', () => {
  wrapper = mount(TariffsBlock, { global: { plugins: [createStore({})] } });

  expect(wrapper.find('.tariffsBlock').classes()).toEqual(['tariffsBlock']);
});

it('watchs props changes', async () => {
  const Div = {
    props: [],

    setup() {
      const isSelected = ref(false);
      const select = () => {
        isSelected.value = !isSelected.value;
      };
      const mods = computed(() => ({ selected: isSelected.value }));

      return {
        isSelected,
        select,
        mods,
      };
    },
    components: {
      TariffsBlock,
    },

    template: `
      <div class='root'>
        <TariffsBlock :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, { global: { plugins: [createStore({})] } });
  expect(wr.find('.tariffsBlock').classes()).toEqual(['tariffsBlock']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tariffsBlock').classes()).toEqual(['tariffsBlock', 'tariffsBlock__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tariffsBlock').classes()).toEqual(['tariffsBlock']);

  wr.unmount();
});

// ===========================
jest.mock('../adapter', () => {
  const vue = jest.requireActual('vue');
  const originalModule = jest.requireActual('../adapter');
  return {
    __esModule: true,
    ...originalModule,
    default: (store: Store<any>) => ({
      tariffsList: vue.computed(() => store.state.list).value,
    }),
  };
});

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

describe('outer store', () => {
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

  it('adding tariff', async () => {
    wrapper = mount(TariffsBlock, {
      global: { plugins: [store] },
    });

    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

    store.commit('add', {
      period: 'scum period',
      apy: 'scum apy',
      amount: 'scum amount',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(4);
    const newTariff = wrapper.findAll('.tariffsBlock-tariffItem')[3];
    expect(newTariff.find('.tariffItem-period').text()).toBe('scum period');
    expect(newTariff.find('.tariffItem-apy').text()).toBe('APY: scum apy');
    expect(newTariff.find('.tariffItem-amount').text()).toBe('Amount: scum amount');
  });

  // it('deleting tariff', async () => {
  //   wrapper = mount(TariffsBlock, {
  //     global: { plugins: [store] },
  //   });

  //   expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

  //   store.commit('delete', 2);
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(2);

  //   store.commit('delete', 0);
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(1);

  //   store.commit('delete', 0);
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(0);
  // });

  // it('changing tariff', async () => {
  //   wrapper = mount(TariffsBlock, {
  //     global: { plugins: [store] },
  //   });

  //   expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

  //   store.commit('change', 0);
  //   await wrapper.vm.$nextTick();
  //   expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);
  //   const newTariff = wrapper.findAll('.tariffsBlock-tariffItem')[0];
  //   expect(newTariff.find('.tariffItem-period').text()).toBe('changed period');
  //   expect(newTariff.find('.tariffItem-apy').text()).toBe('APY: changed apy');
  //   expect(newTariff.find('.tariffItem-amount').text()).toBe('Amount: changed amount');
  // });
});
