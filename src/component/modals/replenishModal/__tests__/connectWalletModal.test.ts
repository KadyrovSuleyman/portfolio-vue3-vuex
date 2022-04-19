/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Modal from '../connectWalletModal.vue';

jest.mock('../adapter.ts', () => {
  const originalModule = jest.requireActual('../adapter.ts');
  return {
    __esModule: true,
    ...originalModule,
    adapt: (store: Store<any>) => ({ ...store.state }),
    generateCloseHandler: (store: Store<any>) => () => {
      store.state.isShown = false;
    },
  };
});

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      isShown: false,
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

beforeEach(() => {
  const el = document.createElement('div');
  el.className = 'app';
  document.body.appendChild(el);
});
afterEach(() => {
  document.body.outerHTML = '';
});

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('connectWalletModal renders', async () => {
  wrapper = mount(Modal, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.connectWalletModal').exists()).toBeFalsy();
  expect(wrapper.findComponent('.background').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();

  expect(wrapper.findComponent('.connectWalletModal').classes()).toEqual(['connectWalletModal']);

  expect(wrapper.findComponent('.connectWalletModal-header').exists()).toBeTruthy();
  expect(wrapper.findComponent('.connectWalletModal-explanation').exists()).toBeTruthy();
  expect(wrapper.findComponent('.connectWalletModal-walletsList').exists()).toBeTruthy();
  expect(wrapper.findComponent('.connectWalletModal-button').exists()).toBeTruthy();

  expect(wrapper.findComponent('.background').exists()).toBeTruthy();
});

it('closes', async () => {
  wrapper = mount(Modal, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.connectWalletModal').exists()).toBeFalsy();
  expect(wrapper.findComponent('.background').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();

  wrapper.findComponent('.connectWalletModal-button').trigger('click');
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeFalsy();

  expect(wrapper.findComponent('.connectWalletModal').exists()).toBeFalsy();
  expect(wrapper.findComponent('.background').exists()).toBeFalsy();
});

it('watchs props changes', async () => {
  store.state.isShown = true;
  wrapper = mount(Modal, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });
  expect(wrapper.findComponent('.connectWalletModal').classes()).toEqual(['connectWalletModal']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.findComponent('.connectWalletModal').classes()).toEqual(['connectWalletModal', 'connectWalletModal__selected']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.findComponent('.connectWalletModal').classes()).toEqual(['connectWalletModal']);
});
