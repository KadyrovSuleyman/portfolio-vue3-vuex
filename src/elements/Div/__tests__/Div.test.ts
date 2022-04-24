import { mount, VueWrapper } from '@vue/test-utils';
import Div from '@/elements/Div/Div.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('div renders', () => {
  wrapper = mount(Div);

  const div = wrapper.get('div');

  expect(div).not.toBeNull();
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

describe('div formates classes correctly', () => {
  afterEach(() => {
    wrapper.unmount();
  });

  it('default element name', () => {
    wrapper = mount(Div, {
      props: {},
    });

    const div = wrapper.get('div');

    expect(div).not.toBeNull();
    expect(div.classes()).toEqual(['div']);
  });

  it('custom element name', () => {
    wrapper = mount(Div, {
      props: { elem: 'custom' },
    });

    const div = wrapper.get('div');

    expect(div).not.toBeNull();
    expect(div.classes()).toEqual(['custom']);
  });

  it('custom block name', () => {
    wrapper = mount(Div, {
      props: { block: 'parent' },
    });

    const div = wrapper.get('div');

    expect(div).not.toBeNull();
    expect(div.classes()).toEqual(['parent-div']);
  });

  it('custom block-element name', () => {
    wrapper = mount(Div, {
      props: { block: 'parent', elem: 'custom' },
    });

    const div = wrapper.get('div');

    expect(div).not.toBeNull();
    expect(div.classes()).toEqual(['parent-custom']);
  });

  it('with mods', () => {
    wrapper = mount(Div, {
      props: {
        mods: {
          enabled: true,
          falsy: false,
          theme: 'dark',
        },
      },
    });

    const div = wrapper.get('div');

    expect(div).not.toBeNull();
    expect(div.classes()).toEqual([
      'div',
      'div__enabled',
      'div__theme_dark',
    ]);
  });

  it('with all bem props', () => {
    wrapper = mount(Div, {
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

    const div = wrapper.get('div');

    expect(div).not.toBeNull();
    expect(div.classes()).toEqual([
      'parent-custom',
      'parent-custom__enabled',
      'parent-custom__theme_dark',
    ]);
  });
});

it('slots', () => {
  wrapper = mount(Div, {
    slots: {
      default: '<button class="test-button" />',
    },
  });

  expect(wrapper.get('.test-button')).not.toBeNull();
  expect(wrapper.html()).toBe('<div class="div"><button class="test-button"></button></div>');
});
