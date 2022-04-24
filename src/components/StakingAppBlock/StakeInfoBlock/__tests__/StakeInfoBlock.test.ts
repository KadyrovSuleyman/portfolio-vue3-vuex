import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import StakeInfoBlock from '../StakeInfoBlock.vue';

jest.mock('../state');
jest.mock('../InfoContainer/state.ts');

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      income: 0,
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

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('stakeInfoBlock renders', () => {
  wrapper = mount(StakeInfoBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(StakeInfoBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.stakeInfoBlock').classes()).toEqual(['stakeInfoBlock']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.stakeInfoBlock').classes()).toEqual([
    'stakeInfoBlock',
    'stakeInfoBlock__selected',
  ]);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.stakeInfoBlock').classes()).toEqual(['stakeInfoBlock']);
});

it('watchs outer store', async () => {
  wrapper = mount(StakeInfoBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.stakeInfoBlock-incomeSpan').text()).toBe(String(0));

  store.commit('change', {
    income: 26.6667,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakeInfoBlock-incomeSpan').text()).toBe(String(26.6667));

  store.commit('change', {
    income: 0,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakeInfoBlock-incomeSpan').text()).toBe(String(0));
});
