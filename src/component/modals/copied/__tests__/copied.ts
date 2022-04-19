/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Notification from '../copied.vue';

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

it('copied renders', async () => {
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.copied-notification').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();

  expect(wrapper.findComponent('.copied-notification').exists()).toBeTruthy();

  expect(wrapper.findComponent('.copied-span').exists()).toBeTruthy();
  expect(wrapper.findComponent('.copied-span').text())
    .toBe('Copied!');
});

it('watchs props changes', async () => {
  store.state.isShown = true;
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });
  expect(wrapper.findComponent('.copied-notification').classes())
    .toEqual(['copied-notification']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.findComponent('.copied-notification').classes())
    .toEqual(['copied-notification', 'copied-notification__selected']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.findComponent('.copied-notification').classes())
    .toEqual(['copied-notification']);
});

it('closes', async () => {
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.copied-notification').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(wrapper.findComponent('.copied-notification').exists()).toBeTruthy();

  wrapper.findComponent('.notification-button').trigger('click');
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeFalsy();
  expect(wrapper.findComponent('.copied-notification').exists()).toBeFalsy();
});
