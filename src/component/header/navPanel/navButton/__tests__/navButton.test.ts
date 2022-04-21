import { mount, VueWrapper } from '@vue/test-utils';
import NavButton from '../navButton.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('navButton renders', () => {
  wrapper = mount(NavButton);

  expect(wrapper.find('div').classes()).toEqual(['navButton']);
  expect(wrapper.find('.navButton-link').classes()).toEqual(['navButton-link']);
  expect(wrapper.find('.navButton-rectangle').classes()).toEqual(['navButton-rectangle']);
});

it('watchs props changes', async () => {
  wrapper = mount(NavButton);
  expect(wrapper.find('.navButton').classes()).toEqual(['navButton']);
  expect(wrapper.find('.navButton-link').classes()).toEqual(['navButton-link']);
  expect(wrapper.find('.navButton-rectangle').classes()).toEqual(['navButton-rectangle']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.navButton').classes()).toEqual(['navButton', 'navButton__selected']);
  expect(wrapper.find('.navButton-link').classes()).toEqual(['navButton-link', 'navButton-link__selected']);
  expect(wrapper.find('.navButton-rectangle').classes())
    .toEqual(['navButton-rectangle', 'navButton-rectangle__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.navButton').classes()).toEqual(['navButton']);
  expect(wrapper.find('.navButton-link').classes()).toEqual(['navButton-link']);
  expect(wrapper.find('.navButton-rectangle').classes()).toEqual(['navButton-rectangle']);
});

it('link generates', () => {
  wrapper = mount(NavButton);
  expect(wrapper.find('a').attributes('href')).toBe('#');
  wrapper.unmount();

  wrapper = mount(NavButton, {
    props: {
      URL: '/test',
    },
  });
  expect(wrapper.find('a').attributes('href')).toBe('/test');
});

it('click triggers', async () => {
  const mockFunc = jest.fn();
  wrapper = mount(NavButton, {
    props: {
      onClick: mockFunc,
    },
  });

  await wrapper.find('a').trigger('click');
  await wrapper.find('a').trigger('click');

  expect(mockFunc).toBeCalledTimes(2);
});
