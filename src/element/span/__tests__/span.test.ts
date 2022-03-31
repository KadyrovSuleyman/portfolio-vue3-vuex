import { mount } from '@vue/test-utils';
import Span from '@/element/span/span.vue';
import { createStore } from 'vuex';

let wrapper = mount(Span, {});
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('span renders', () => {
  wrapper = mount(Span);

  const span = wrapper.get('span');

  expect(span).not.toBeNull();
  expect(span.html()).toBe('<span class="span"></span>');
});

describe('span formates classes correctly', () => {
  afterEach(() => {
    wrapper.unmount();
  });

  it('default element name', () => {
    wrapper = mount(Span, {
      props: {},
    });

    const span = wrapper.get('span');

    expect(span).not.toBeNull();
    expect(span.classes()).toEqual(['span']);
  });

  it('custom element name', () => {
    wrapper = mount(Span, {
      props: { elem: 'custom' },
    });

    const span = wrapper.get('span');

    expect(span).not.toBeNull();
    expect(span.classes()).toEqual(['custom']);
  });

  it('custom block name', () => {
    wrapper = mount(Span, {
      props: { block: 'parent' },
    });

    const span = wrapper.get('span');

    expect(span).not.toBeNull();
    expect(span.classes()).toEqual(['parent-span']);
  });

  it('custom block-element name', () => {
    wrapper = mount(Span, {
      props: { block: 'parent', elem: 'custom' },
    });

    const span = wrapper.get('span');

    expect(span).not.toBeNull();
    expect(span.classes()).toEqual(['parent-custom']);
  });

  it('with mods', () => {
    wrapper = mount(Span, {
      props: {
        mods: {
          enabled: true,
          falsy: false,
          theme: 'dark',
        },
      },
    });

    const span = wrapper.get('span');

    expect(span).not.toBeNull();
    expect(span.classes()).toEqual(['span', 'span__enabled', 'span__theme_dark']);
  });

  it('with all bem props', () => {
    wrapper = mount(Span, {
      props: {
        block: 'parent',
        elem: 'custom',
        mods: {
          enabled: true,
          falsy: false,
          theme: 'dark',
        },
      },
    });

    const span = wrapper.get('span');

    expect(span).not.toBeNull();
    expect(span.classes()).toEqual(['parent-custom', 'parent-custom__enabled', 'parent-custom__theme_dark']);
  });
});

it('slots', () => {
  wrapper = mount(Span, {
    // slots: {
    //   default: 'test text',
    // },
    props: {
      msg: 'test text',
    },
  });

  expect(wrapper.html()).toBe('<span class="span">test text</span>');
});

it('props from store', async () => {
  const store = createStore({
    state: {
      msg: 'before',
    },
    mutations: {
      change: (state) => { state.msg = 'after'; },
    },
    actions: {
      act: ({ commit }) => { commit('change'); },
    },
  });

  wrapper = mount(Span, {
    global: {
      provide: {
        store,
      },
    },
    // slots: {
    //   default: store.state.msg,
    // },
    props: {
      msg: store.state.msg,
    },
  });

  const div = wrapper.get('span');
  expect(div).not.toBeNull();
  expect(div.html()).toBe('<span class="span">before</span>');

  store.commit('change');
  store.dispatch('act');
  await wrapper.vm.$nextTick();

  expect(div).not.toBeNull();
  expect(store.state.msg).toBe('after');

  expect(div.html()).toBe('<span class="span">after</span>');
});
