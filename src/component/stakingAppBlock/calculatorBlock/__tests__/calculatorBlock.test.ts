import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import CalculatorBlock from '../calculatorBlock.vue';

jest.mock('../adapter');
jest.mock('../calculator/adapter.ts');
jest.mock('../calculator/logic.ts');

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      isWalletConnected: false,
      isWalletApproved: false,
      isStaked: false,
    },
    mutations: {
      change: (state, obj: { [name: string]: boolean | string }) => {
        Object.keys(obj).forEach((index) => {
          state[index] = obj[index];
        });
      },
    },
  });
});

it('calculatorBlock renders', () => {
  wrapper = mount(CalculatorBlock, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.calculatorBlock').classes()).toEqual(['calculatorBlock']);
});

it('watchs props changes', async () => {
  wrapper = mount(CalculatorBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.calculatorBlock').classes()).toEqual(['calculatorBlock']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.calculatorBlock').classes()).toEqual(['calculatorBlock', 'calculatorBlock__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.calculatorBlock').classes()).toEqual(['calculatorBlock']);
});

it('watching outer store', async () => {
  wrapper = mount(CalculatorBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.calculatorBlock').exists()).toBeTruthy();

  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeTruthy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeFalsy();
  expect(wrapper.find('.infoBlock-span').text()).toContain('connect');

  store.commit('change', {
    isWalletConnected: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeTruthy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeFalsy();
  expect(wrapper.find('.infoBlock-span').text()).toContain('approve');

  store.commit('change', {
    isWalletApproved: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeTruthy();

  store.commit('change', {
    isStaked: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeFalsy();
});
