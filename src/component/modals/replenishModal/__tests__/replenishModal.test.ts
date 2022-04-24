/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Modal from '../replenishModal.vue';
import { value } from '../adapter';

jest.mock('../adapter.ts');

let store: Store<any>;
beforeEach(() => {
  value.value = '';
  store = createStore<any>({
    state: {
      isShown: false,
      maxAmount: 1000,
      availableAmount: 40,
      replenishCount: 0,

      value: value.value,
      setValue: (newValue: string) => { value.value = newValue; },

      hide: () => { store.state.isShown = false; },
      replenish: () => { store.state.replenishCount += 1; },
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

let element: HTMLElement;
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

it('replenishModal renders', async () => {
  wrapper = mount(Modal, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(element.outerHTML).toMatchSnapshot();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();

  expect(element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  store.state.isShown = true;
  wrapper = mount(Modal, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });
  expect(wrapper.findComponent('.replenishModal').classes()).toEqual(['replenishModal']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.findComponent('.replenishModal').classes()).toEqual(['replenishModal', 'replenishModal__selected']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.findComponent('.replenishModal').classes()).toEqual(['replenishModal']);
});

it('closes', async () => {
  wrapper = mount(Modal, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.replenishModal').exists()).toBeFalsy();
  expect(wrapper.findComponent('.background').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();

  wrapper.findComponent('.replenishModal-close-button').trigger('click');
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeFalsy();

  expect(wrapper.findComponent('.replenishModal').exists()).toBeFalsy();
  expect(wrapper.findComponent('.background').exists()).toBeFalsy();
});

it('replenish clicks', async () => {
  wrapper = mount(Modal, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.replenishModal').exists()).toBeFalsy();
  expect(wrapper.findComponent('.background').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(store.state.replenishCount).toBe(0);

  wrapper.findComponent('.replenishModal-replenish-button').trigger('click');
  await wrapper.vm.$nextTick();
  expect(store.state.replenishCount).toBe(1);

  wrapper.findComponent('.replenishModal-replenish-button').trigger('click');
  await wrapper.vm.$nextTick();
  expect(store.state.replenishCount).toBe(2);
});
