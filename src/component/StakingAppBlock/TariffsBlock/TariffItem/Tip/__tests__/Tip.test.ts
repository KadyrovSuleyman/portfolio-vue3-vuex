import { mount, VueWrapper } from '@vue/test-utils';
import Tip from '../Tip.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('tip renders', () => {
  wrapper = mount(Tip);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(Tip, {
    slots: {
      default: 'test-tip',
    },
  });
  expect(wrapper.find('.tip').classes()).toEqual(['tip']);
  expect(wrapper.find('.tip-span').text()).toBe('test-tip');

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.tip').classes()).toEqual(['tip', 'tip__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.tip').classes()).toEqual(['tip']);
});
