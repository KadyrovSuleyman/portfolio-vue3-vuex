import { mount, VueWrapper } from '@vue/test-utils';
import { ref } from 'vue';
import { createStore, Store } from 'vuex';
import Calculator from '../Calculator.vue';

jest.mock('../adapter');

let store: Store<any>;
let wrapper: VueWrapper<any>;

beforeEach(() => {
  store = createStore<any>({
    state: {
      maxValue: 1000,
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

  expect(wrapper.element.outerHTML).toMatchSnapshot();
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
  const value = ref('');

  it('maxValue', async () => {
    wrapper = mount(Calculator, {
      global: { plugins: [store] },
      props: {
        value: value.value,
        setValue: (newValue: string) => { value.value = newValue; },
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.calculator').exists()).toBeTruthy();

    const input = wrapper.find('.promtInput-input');
    expect((input.element as HTMLInputElement).value).toBe('');

    const max = wrapper.find('.calculator-button');
    await max.trigger('click');
    expect(value.value).toBe(`${store.state.maxValue}`);
    await wrapper.setProps({
      ...wrapper.props,
      value: value.value,
    });
    expect(wrapper.find('input').element.value).toBe(`${store.state.maxValue}`);

    ((input.element as HTMLInputElement).value) = String(500);
    await input.trigger('input');
    expect(value.value).toBe('500');
    await wrapper.setProps({
      ...wrapper.props,
      value: value.value,
    });
    expect(wrapper.find('input').element.value).toBe('500');

    store.commit('change', {
      maxValue: 800,
    });
    await max.trigger('click');
    expect(store.state.maxValue).toBe(800);
    expect(value.value).toBe('800');
    await wrapper.setProps({
      ...wrapper.props,
      value: value.value,
    });
    expect(wrapper.find('input').element.value).toBe('800');
  });
});
