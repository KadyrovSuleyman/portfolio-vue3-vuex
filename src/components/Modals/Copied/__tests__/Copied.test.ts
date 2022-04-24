/* eslint-disable no-param-reassign */
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Notification from '../Copied.vue';

jest.mock('../state.ts');

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

it('copied renders', async () => {
  wrapper = mount(Notification, {
    global: { plugins: [store] },
    props: {
      target: '.app',
    },
  });

  // expect(wrapper.findComponent('.copied-notification').exists()).toBeFalsy();
  expect(element.outerHTML).toMatchSnapshot();

  // store.commit('change', {
  //   isShown: true,
  // });
  store.state.isShown = true;
  await wrapper.vm.$nextTick();
  expect(store.state.isShown).toBeTruthy();
  expect(element.outerHTML).toMatchSnapshot();

  // expect(wrapper.findComponent('.copied-notification').exists()).toBeTruthy();

  // expect(wrapper.findComponent('.copied-span').exists()).toBeTruthy();
  // expect(wrapper.findComponent('.copied-span').text()).toBe('Copied!');
});

// it('watchs props changes', async () => {
//   store.state.isShown = true;
//   wrapper = mount(Notification, {
//     global: { plugins: [store] },
//     props: {
//       target: '.app',
//     },
//   });
//   expect(wrapper.findComponent('.copied-notification').classes()).toEqual(['copied-notification']);

//   await wrapper.setProps({
//     ...wrapper.props,
//     mods: {
//       selected: true,
//     },
//   });
//   expect(wrapper.findComponent('.copied-notification').classes()).toEqual([
//     'copied-notification',
//     'copied-notification__selected',
//   ]);

//   await wrapper.setProps({
//     ...wrapper.props,
//     mods: {
//       selected: false,
//     },
//   });
//   expect(wrapper.findComponent('.copied-notification').classes()).toEqual(['copied-notification']);
// });

// it('closes', async () => {
//   wrapper = mount(Notification, {
//     global: { plugins: [store] },
//     props: {
//       target: '.app',
//     },
//   });

//   expect(wrapper.findComponent('.copied-notification').exists()).toBeFalsy();

//   store.commit('change', {
//     isShown: true,
//   });
//   await wrapper.vm.$nextTick();
//   expect(store.state.isShown).toBeTruthy();
//   expect(wrapper.findComponent('.copied-notification').exists()).toBeTruthy();

//   wrapper.findComponent('.notification-button').trigger('click');
//   await wrapper.vm.$nextTick();
//   expect(store.state.isShown).toBeFalsy();
//   expect(wrapper.findComponent('.copied-notification').exists()).toBeFalsy();
// });
