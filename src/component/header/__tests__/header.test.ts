import { mount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import Header from '../header.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('navButton renders', () => {
  wrapper = mount(Header, { global: { plugins: [createStore({})] } });

  expect(wrapper.find('header').classes()).toEqual(['header']);
  expect(wrapper.find('.header-navPanel').classes()).toEqual(['header-navPanel']);
  expect(wrapper.find('.header-walletBlock').classes()).toEqual(['header-walletBlock']);
});

it('watchs props changes', async () => {
  wrapper = mount(Header, { global: { plugins: [createStore({})] } });
  expect(wrapper.find('header').classes()).toEqual(['header']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('header').classes()).toEqual(['header', 'header__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('header').classes()).toEqual(['header']);
});
