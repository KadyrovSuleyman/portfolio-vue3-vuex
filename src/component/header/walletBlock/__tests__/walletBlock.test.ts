import { mount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import WalletBlock from '../walletBlock.vue';

jest.mock('../adapter');

jest.mock('../walletDiv/adapter.ts');
jest.mock('../walletDiv/logic.ts');

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('walletBlock renders', () => {
  wrapper = mount(WalletBlock, { global: { plugins: [createStore({})] } });

  expect(wrapper.find('div').classes()).toEqual(['walletBlock']);
});

it('watchs props changes', async () => {
  wrapper = mount(WalletBlock, { global: { plugins: [createStore({})] } });
  expect(wrapper.find('.walletBlock').classes()).toEqual(['walletBlock']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.walletBlock').classes()).toEqual(['walletBlock', 'walletBlock__selected']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.walletBlock').classes()).toEqual(['walletBlock']);
});

it('walletBlock if wallet connected, connectBlock if dont', async () => {
  const store = createStore({
    state: {
      connect: false,
    },
    mutations: {
      changeConnection: (state) => { state.connect = !state.connect; },
    },
  });

  wrapper = mount(WalletBlock, {
    global: {
      plugins: [store],
    },
  });

  expect(wrapper.find('.walletBlock-walletDiv').exists()).toBeFalsy();
  expect(wrapper.find('.walletBlock-connectBlock').exists()).toBeTruthy();

  store.commit('changeConnection');
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.walletBlock-walletDiv').exists()).toBeTruthy();
  expect(wrapper.find('.walletBlock-connectBlock').exists()).toBeFalsy();

  store.commit('changeConnection');
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.walletBlock-walletDiv').exists()).toBeFalsy();
  expect(wrapper.find('.walletBlock-connectBlock').exists()).toBeTruthy();
});
