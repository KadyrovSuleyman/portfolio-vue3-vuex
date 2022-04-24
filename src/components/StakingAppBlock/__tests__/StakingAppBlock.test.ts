import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import StakingAppBlock from '../StakingAppBlock.vue';

jest.mock('../state');
jest.mock('../ActionsBlock/state.ts');
jest.mock('../CalculatorBlock/state.ts');
jest.mock('../StakeInfoBlock/InfoContainer/state.ts');
jest.mock('../StakeInfoBlock/state.ts');
jest.mock('../TariffsBlock/state.ts');

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
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

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

// =================================
it('stakingAppBlock renders', () => {
  wrapper = mount(StakingAppBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(StakingAppBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.stakingAppBlock').classes()).toEqual(['stakingAppBlock']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.stakingAppBlock').classes()).toEqual([
    'stakingAppBlock',
    'stakingAppBlock__selected',
  ]);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.stakingAppBlock').classes()).toEqual(['stakingAppBlock']);
});

it('watching outer store', async () => {
  wrapper = mount(StakingAppBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  store.commit('change', {
    isWalletApproved: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  store.commit('change', {
    isWalletApproved: false,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  store.commit('change', {
    isStaked: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  store.commit('change', {
    isStaked: false,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});
