/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Modal from '../connectWalletModal.vue';

jest.mock('../adapter.ts');
jest.mock('../walletsList/adapter.ts');

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      isShown: false,
      hide: () => { store.state.isShown = false; },
    },
  });
});

let element: HTMLDivElement;
beforeEach(() => {
  element = document.createElement('div');
  element.className = 'app';
  document.body.appendChild(element);
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
  expect(element.outerHTML).toMatchSnapshot();

  store.state.isShown = true;
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(element.outerHTML).toMatchSnapshot();
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

  store.state.isShown = true;
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

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.findComponent('.connectWalletModal').classes()).toEqual([
    'connectWalletModal',
    'connectWalletModal__selected',
  ]);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.findComponent('.connectWalletModal').classes()).toEqual(['connectWalletModal']);
});
