import { mount } from '@vue/test-utils';
import Button from '@/element/button/button.vue';
import { createStore } from 'vuex';

let wrapper = mount(Button, {});
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('button renders', () => {
  wrapper = mount(Button);

  const button = wrapper.get('button');

  expect(button).not.toBeNull();
  expect(button.html()).toBe('<button class="button"></button>');
});

describe('button formates classes correctly', () => {
  afterEach(() => {
    wrapper.unmount();
  });

  it('default element name', () => {
    wrapper = mount(Button, {
      props: {},
    });

    const button = wrapper.get('button');

    expect(button).not.toBeNull();
    expect(button.classes()).toEqual(['button']);
  });

  it('custom element name', () => {
    wrapper = mount(Button, {
      props: { elem: 'custom' },
    });

    const button = wrapper.get('button');

    expect(button).not.toBeNull();
    expect(button.classes()).toEqual(['custom']);
  });

  it('custom block name', () => {
    wrapper = mount(Button, {
      props: { block: 'parent' },
    });

    const button = wrapper.get('button');

    expect(button).not.toBeNull();
    expect(button.classes()).toEqual(['parent-button']);
  });

  it('custom block-element name', () => {
    wrapper = mount(Button, {
      props: { block: 'parent', elem: 'custom' },
    });

    const button = wrapper.get('button');

    expect(button).not.toBeNull();
    expect(button.classes()).toEqual(['parent-custom']);
  });

  it('with mods', () => {
    wrapper = mount(Button, {
      props: {
        mods: {
          enabled: true,
          falsy: false,
          theme: 'dark',
        },
      },
    });

    const button = wrapper.get('button');

    expect(button).not.toBeNull();
    expect(button.classes()).toEqual(['button', 'button__enabled', 'button__theme_dark']);
  });

  it('with all bem props', () => {
    wrapper = mount(Button, {
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

    const button = wrapper.get('button');

    expect(button).not.toBeNull();
    expect(button.classes()).toEqual(['parent-custom', 'parent-custom__enabled', 'parent-custom__theme_dark']);
  });
});

it('click trigger', () => {
  const store = createStore({
    state: {
      count: 0,
    },
    mutations: {
      click: (state) => { state.count += 1; },
    },
  });

  wrapper = mount(Button, {
    props: {
      onclick: store.commit.bind('click'),
    },
  });

  const button = wrapper.get('button');
  expect(button).not.toBeNull();
  expect(store.state.count).toBe(0);

  button.trigger('click');
  button.trigger('click');
  expect(store.state.count).toBe(2);
});
