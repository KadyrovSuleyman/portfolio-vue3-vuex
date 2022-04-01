import { mount } from '@vue/test-utils';
import Link from '@/element/link/link.vue';
import { createStore } from 'vuex';

let wrapper = mount(Link, {});
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('link renders', () => {
  wrapper = mount(Link);

  const link = wrapper.get('a');

  expect(link).not.toBeNull();
  expect(link.html()).toBe('<a href="#" class="link"></a>');
});

describe('link formates classes correctly', () => {
  afterEach(() => {
    wrapper.unmount();
  });

  it('default element name', () => {
    wrapper = mount(Link, {
      props: {},
    });

    const link = wrapper.get('a');

    expect(link).not.toBeNull();
    expect(link.classes()).toEqual(['link']);
  });

  it('custom element name', () => {
    wrapper = mount(Link, {
      props: { elem: 'custom' },
    });

    const link = wrapper.get('a');

    expect(link).not.toBeNull();
    expect(link.classes()).toEqual(['custom']);
  });

  it('custom block name', () => {
    wrapper = mount(Link, {
      props: { block: 'parent' },
    });

    const link = wrapper.get('a');

    expect(link).not.toBeNull();
    expect(link.classes()).toEqual(['parent-link']);
  });

  it('custom block-element name', () => {
    wrapper = mount(Link, {
      props: { block: 'parent', elem: 'custom' },
    });

    const link = wrapper.get('a');

    expect(link).not.toBeNull();
    expect(link.classes()).toEqual(['parent-custom']);
  });

  it('with mods', () => {
    wrapper = mount(Link, {
      props: {
        mods: {
          enabled: true,
          falsy: false,
          theme: 'dark',
        },
      },
    });

    const link = wrapper.get('a');

    expect(link).not.toBeNull();
    expect(link.classes()).toEqual(['link', 'link__enabled', 'link__theme_dark']);
  });

  it('with all bem props', () => {
    wrapper = mount(Link, {
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

    const link = wrapper.get('a');

    expect(link).not.toBeNull();
    expect(link.classes()).toEqual(['parent-custom', 'parent-custom__enabled', 'parent-custom__theme_dark']);
  });
});

it('link generates', () => {
  wrapper = mount(Link);
  expect(wrapper.find('a').attributes('href')).toBe('#');
  wrapper.unmount();

  wrapper = mount(Link, {
    props: {
      URL: '/test',
    },
  });
  expect(wrapper.find('a').attributes('href')).toBe('/test');
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

  wrapper = mount(Link, {
    props: {
      onClick: store.commit.bind('click'),
    },
  });

  const link = wrapper.get('a');
  expect(link).not.toBeNull();
  expect(store.state.count).toBe(0);

  link.trigger('click');
  link.trigger('click');
  expect(store.state.count).toBe(2);
});
