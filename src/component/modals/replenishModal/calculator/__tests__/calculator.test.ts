import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Calculator from '../calculator.vue';

jest.mock('../adapter');

let store: Store<any>;
let wrapper: VueWrapper<any>;

beforeEach(() => {
  store = createStore<any>({
    state: {
      maxValue: 1000,
      period: '30 Days',
      rewardCalcParam: 0.4,
    },
    mutations: {
      change: (state, obj: { [name: string]: any }) => {
        Object.keys(obj).forEach((index) => {
          state[index] = obj[index];
        });
      },
    },
  });
});
afterEach(() => {
  wrapper.unmount();
});

// =================================
it('calculator renders', () => {
  wrapper = mount(Calculator, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.calculator').classes()).toEqual(['calculator']);

  expect(wrapper.find('.calculator-promtInput').exists()).toBeTruthy();
  expect(wrapper.find('.calculator-button').exists()).toBeTruthy();
});

it('watchs props changes', async () => {
  wrapper = mount(Calculator, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.calculator').classes()).toEqual(['calculator']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.calculator').classes()).toEqual(['calculator', 'calculator__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.calculator').classes()).toEqual(['calculator']);
});

describe('watching outer store', () => {
  it('maxValue', async () => {
    wrapper = mount(Calculator, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.calculator').exists()).toBeTruthy();

    const input = wrapper.find('.promtInput-input');
    expect((input.element as HTMLInputElement).value).toBe('');

    const max = wrapper.find('.calculator-button');
    await max.trigger('click');
    expect((input.element as HTMLInputElement).value).toBe(`${store.state.maxValue}`);

    ((input.element as HTMLInputElement).value) = String(500);
    await input.trigger('input');
    expect((input.element as HTMLInputElement).value).toBe('500');

    store.commit('change', {
      maxValue: 800,
    });
    await max.trigger('click');
    expect(store.state.maxValue).toBe(800);
    expect((input.element as HTMLInputElement).value).toBe('800');
  });
});
