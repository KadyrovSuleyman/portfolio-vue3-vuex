import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import StakingAppBlock from '../stakingAppBlock.vue';

jest.mock('../adapter');
jest.mock('../actionsBlock/adapter.ts');
jest.mock('../calculatorBlock/adapter.ts');
jest.mock('../stakeInfoBlock/infoContainer/adapter.ts');
jest.mock('../stakeInfoBlock/adapter.ts');
jest.mock('../tariffsBlock/adapter.ts');

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

  expect(wrapper.find('.stakingAppBlock').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-header').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-calculatorBlock')
    .exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-actionsBlock')
    .exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-viewContractButton')
    .exists()).toBeTruthy();
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
  expect(wrapper.find('.stakingAppBlock').classes()).toEqual(['stakingAppBlock', 'stakingAppBlock__selected']);

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
  expect(wrapper.find('.stakingAppBlock').exists()).toBeTruthy();

  expect(wrapper.find('.stakingAppBlock-walletApprovedBlock').exists()).toBeFalsy();

  store.commit('change', {
    isWalletApproved: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-walletApprovedBlock').exists()).toBeTruthy();

  store.commit('change', {
    isWalletApproved: false,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-walletApprovedBlock').exists()).toBeFalsy();

  expect(wrapper.find('.stakingAppBlock-stakeInfoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-bgImg').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-tariffsBlock').exists()).toBeTruthy();

  store.commit('change', {
    isStaked: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-stakeInfoBlock').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-bgImg').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-tariffsBlock').exists()).toBeFalsy();

  store.commit('change', {
    isStaked: false,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-stakeInfoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-bgImg').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-tariffsBlock').exists()).toBeTruthy();
});
