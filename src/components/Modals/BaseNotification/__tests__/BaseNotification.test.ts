import { mount, VueWrapper } from '@vue/test-utils';
import Notification from '../BaseNotification.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('baseNotification renders', () => {
  wrapper = mount(Notification, {
    slots: {
      default: 'hello',
    },
  });
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(Notification);
  expect(wrapper.find('.notification').classes()).toEqual(['notification']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.notification').classes()).toEqual([
    'notification',
    'notification__selected',
  ]);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.notification').classes()).toEqual(['notification']);
});
