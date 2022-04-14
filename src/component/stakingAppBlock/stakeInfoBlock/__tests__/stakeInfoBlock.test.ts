import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import StakeInfoBlock from '../stakeInfoBlock.vue';

jest.mock('../adapter', () => {
  const originalModule = jest.requireActual('../adapter');
  return {
    __esModule: true,
    ...originalModule,
    default: (store: Store<any>) => ({ ...store.state }),
  };
});

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

  expect(wrapper.find('.stakeInfoBlock').exists()).toBeTruthy();

  expect(wrapper.find('.stakeInfoBlock-infoContainer').exists()).toBeTruthy();

  expect(wrapper.find('.stakeInfoBlock-div').exists()).toBeTruthy();
  expect(wrapper.find('.stakeInfoBlock-incomeSpan').exists()).toBeTruthy();
  expect(wrapper.find('.stakeInfoBlock-promtSpan').exists()).toBeTruthy();
});

it('watchs props changes', async () => {
  wrapper = mount(StakeInfoBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.stakeInfoBlock').classes()).toEqual(['stakeInfoBlock']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakeInfoBlock').classes()).toEqual(['stakeInfoBlock', 'stakeInfoBlock__selected']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  await wrapper.vm.$nextTick();
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