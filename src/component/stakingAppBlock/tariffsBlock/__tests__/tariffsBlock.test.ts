import { mount, VueWrapper } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import { TariffT } from '@/store/tariff/types.d';
import store from '@/store';
import TariffsBlock from '../tariffsBlock.vue';

// jest.mock('../adapter', () => {
//   const originalModule = jest.requireActual('../adapter');
//   return {
//     __esModule: true,
//     ...originalModule,
//     default: (store: Store<any>) => ({
//       tariffsList: store.state.list,
//       selectList: store.state.selectList,
//     }),
//   };
// });

// let store: Store<any>;
// beforeEach(() => {
//   store = createStore({
//     state: {
//       list: [
//         {
//           period: 30,
//           apy: 103.23,
//           amountMin: 100,
//           amountMax: 299,
//         },
//         {
//           period: 90,
//           apy: 116.86,
//           amountMin: 100,
//           amountMax: 299,
//         },
//         {
//           period: 150,
//           apy: 129.97,
//           amountMin: 500,
//           amountMax: 1000,
//         },
//         // {
//         //   period: '90 Days',
//         //   apy: '116,86%',
//         //   amount: '100 - 299 TKN',
//         // },
//         // {
//         //   period: '150 Days',
//         //   apy: '129,97%',
//         //   amount: '500 - 1000 TKN',
//         // },
//       ],
//       // selectList: {
//       //   '30 Days': undefined,
//       //   '90 Days': undefined,
//       //   '150 Days': undefined,
//       // },
//       selectList: {
//         30: undefined,
//         90: undefined,
//         150: undefined,
//       },
//     },
//     mutations: {
//       add: (state, item: TariffT) => { state.list.push(item); },
//       delete: (state, index: number) => { state.list.splice(index, 1); },
//       change: (state, index: number) => {
//         state.list[index].period = 505;
//         state.list[index].apy = 505;
//         state.list[index].amountMin = 505;
//         state.list[index].amountMax = 505;
//       },
//     },
//   });
// });

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

// ===========================

it('tariffsBlock renders', () => {
  wrapper = mount(TariffsBlock, { global: { plugins: [store] } });

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
  const wr = mount(Div, { global: { plugins: [store] } });
  expect(wr.find('.tariffsBlock').classes()).toEqual(['tariffsBlock']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tariffsBlock').classes()).toEqual(['tariffsBlock', 'tariffsBlock__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tariffsBlock').classes()).toEqual(['tariffsBlock']);

  wr.unmount();
});

// describe('outer store changing', () => {
//   it('adding tariff', async () => {
//     wrapper = mount(TariffsBlock, {
//       global: { plugins: [store] },
//     });

//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

//     store.commit('add', {
//       period: 'scum period',
//       apy: 'scum apy',
//       amount: 'scum amount',
//     });
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(4);
//     const newTariff = wrapper.findAll('.tariffsBlock-tariffItem')[3];
//     expect(newTariff.find('.tariffItem-period').text()).toBe('scum period');
//     expect(newTariff.find('.tariffItem-apy').text()).toBe('APY: scum apy');
//     expect(newTariff.find('.tariffItem-amount').text()).toBe('Amount: scum amount');
//   });

//   it('deleting tariff', async () => {
//     wrapper = mount(TariffsBlock, {
//       global: { plugins: [store] },
//     });

//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

//     store.commit('delete', 2);
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(2);

//     store.commit('delete', 0);
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(1);

//     store.commit('delete', 0);
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(0);
//   });

//   it('changing tariff', async () => {
//     wrapper = mount(TariffsBlock, {
//       global: { plugins: [store] },
//     });

//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);

//     store.commit('change', 0);
//     await wrapper.vm.$nextTick();
//     expect(wrapper.findAll('.tariffsBlock-tariffItem').length).toBe(3);
//     const newTariff = wrapper.findAll('.tariffsBlock-tariffItem')[0];
//     expect(newTariff.find('.tariffItem-period').text()).toBe('changed period');
//     expect(newTariff.find('.tariffItem-apy').text()).toBe('APY: changed apy');
//     expect(newTariff.find('.tariffItem-amount').text()).toBe('Amount: changed amount');
//   });
// });

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
