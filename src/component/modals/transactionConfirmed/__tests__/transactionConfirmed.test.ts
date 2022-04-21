/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Notification from '../transactionConfirmed.vue';

jest.mock('../adapter.ts');

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      isShown: false,
      notificationClickCount: 0,
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

it('transactionConfirmed renders', async () => {
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();

  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeTruthy();

  expect(wrapper.findComponent('.transactionConfirmed-button').exists()).toBeTruthy();
  expect(wrapper.findComponent('.transactionConfirmed-span').exists()).toBeTruthy();
  expect(wrapper.findComponent('.transactionConfirmed-span').text())
    .toBe('Transaction confirmed! Click here to see it');
});

it('watchs props changes', async () => {
  store.state.isShown = true;
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });
  expect(wrapper.findComponent('.transactionConfirmed-notification').classes())
    .toEqual(['transactionConfirmed-notification']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.findComponent('.transactionConfirmed-notification').classes())
    .toEqual(['transactionConfirmed-notification', 'transactionConfirmed-notification__selected']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.findComponent('.transactionConfirmed-notification').classes())
    .toEqual(['transactionConfirmed-notification']);
});

it('closes', async () => {
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeTruthy();

  wrapper.findComponent('.notification-button').trigger('click');
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeFalsy();
  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeFalsy();
});

it('notification clicks', async () => {
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeFalsy();

  store.commit('change', {
    isShown: true,
  });
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeTruthy();
  expect(store.state.notificationClickCount).toBe(0);

  await wrapper.findComponent('.transactionConfirmed-button').trigger('click');
  expect(store.state.notificationClickCount).toBe(1);

  await wrapper.findComponent('.transactionConfirmed-button').trigger('click');
  expect(store.state.notificationClickCount).toBe(2);
});
