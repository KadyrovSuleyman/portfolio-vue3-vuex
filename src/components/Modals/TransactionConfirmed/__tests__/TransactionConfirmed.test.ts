/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Notification from '../TransactionConfirmed.vue';

jest.mock('../state.ts');

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      isShown: false,
      hide: () => { store.state.isShown = false; },
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

it('transactionConfirmed renders', async () => {
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeFalsy();

  store.state.isShown = true;
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(element.outerHTML).toMatchSnapshot();
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

  store.state.isShown = true;
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

  store.replaceState({
    hide: jest.fn(),
  });

  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeFalsy();

  store.state.isShown = true;
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(wrapper.findComponent('.transactionConfirmed-notification').exists()).toBeTruthy();
  expect(store.state.hide).toBeCalledTimes(0);

  await wrapper.findComponent('.transactionConfirmed-button').trigger('click');
  expect(store.state.hide).toBeCalledTimes(1);

  await wrapper.findComponent('.transactionConfirmed-button').trigger('click');
  expect(store.state.hide).toBeCalledTimes(2);
});
