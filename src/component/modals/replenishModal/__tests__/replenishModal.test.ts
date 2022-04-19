/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Modal from '../replenishModal.vue';

jest.mock('../adapter.ts', () => {
  const originalModule = jest.requireActual('../adapter.ts');
  return {
    __esModule: true,
    ...originalModule,
    adapt: (store: Store<any>) => ({ ...store.state }),
    generateCloseHandler: (store: Store<any>) => () => {
      store.state.isShown = false;
    },
    generateReplenishConfirmHandler: (store: Store<any>) => () => {
      store.state.replenishCount += 1;
    },
  };
});

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      isShown: false,
      maxAmount: 1000,
      availableAmount: 40,
      replenishCount: 0,
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

it('replenishModal renders', async () => {
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

  expect(wrapper.findComponent('.replenishModal').exists()).toBeTruthy();

  expect(wrapper.findComponent('.replenishModal-header').exists()).toBeTruthy();
  expect(wrapper.findAllComponents('.replenishModal-span').length).toBe(2);
  expect(wrapper.findAllComponents('.replenishModal-tkn-span').length).toBe(2);
  expect(wrapper.findComponent('.replenishModal-calculator').exists()).toBeTruthy();
  expect(wrapper.findComponent('.replenishModal-replenish-button').exists()).toBeTruthy();
  expect(wrapper.findComponent('.replenishModal-close-button').exists()).toBeTruthy();

  expect(wrapper.findComponent('.background').exists()).toBeTruthy();
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

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.findComponent('.replenishModal').classes()).toEqual(['replenishModal', 'replenishModal__selected']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  await wrapper.vm.$nextTick();
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
