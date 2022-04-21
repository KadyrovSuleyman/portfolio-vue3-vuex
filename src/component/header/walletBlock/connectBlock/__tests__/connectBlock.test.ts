import { mount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import ConnectBlock from '../connectBlock.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('connectBlock renders', () => {
  wrapper = mount(ConnectBlock);

  expect(wrapper.find('div').classes()).toEqual(['connectBlock']);
  expect(wrapper.find('button').classes()).toEqual(['connectBlock-button']);
  expect(wrapper.find('button').text()).toBe('Connect wallet');
});

it('watchs props changes', async () => {
  wrapper = mount(ConnectBlock);
  expect(wrapper.find('.connectBlock').classes()).toEqual(['connectBlock']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.connectBlock').classes()).toEqual(['connectBlock', 'connectBlock__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.connectBlock').classes()).toEqual(['connectBlock']);

  wrapper.unmount();
});

it('click sends data to outer store', async () => {
  const store = createStore({
    state: {
      clicked: false,
    },
    mutations: {
      click: (state) => { state.clicked = true; },
    },
  });

  wrapper = mount(ConnectBlock, {
    props: {
      onClick: store.commit.bind('click'),
    },
  });

  expect(store.state.clicked).toBeFalsy();

  await wrapper.find('button').trigger('click');
  expect(store.state.clicked).toBeTruthy();
});
