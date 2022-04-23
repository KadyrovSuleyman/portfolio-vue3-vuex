import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import Calculator from '../calculator.vue';

jest.mock('../adapter');
jest.mock('../logic');

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      maxValue: 1000,
      minValue: 500,
      period: 30,
      apy: 150,

      text: '',
      setText: (newInput: string) => store.commit('change', {
        text: newInput,
      }),

      reward: 0,
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

it('calculator renders', () => {
  wrapper = mount(Calculator, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.calculator').classes()).toEqual(['calculator']);

  expect(wrapper.find('.calculator-promtInput').exists()).toBeTruthy();
  expect(wrapper.find('.calculator-button').exists()).toBeTruthy();
  expect(wrapper.find('.calculator-div').exists()).toBeTruthy();
  expect(wrapper.find('.calculator-periodSpan').exists()).toBeTruthy();
  expect(wrapper.find('.calculator-rewardSpan').exists()).toBeFalsy();
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
    await wrapper.vm.$nextTick();
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

  it('period', async () => {
    wrapper = mount(Calculator, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.calculator').exists()).toBeTruthy();
    expect(wrapper.find('.calculator-periodSpan').text())
      .toBe(`Reward for ${store.state.period} Days:`);

    store.commit('change', {
      period: 90,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.calculator-periodSpan').text())
      .toBe('Reward for 90 Days:');
  });
});
