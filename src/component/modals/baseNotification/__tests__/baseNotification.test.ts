import { mount, VueWrapper } from '@vue/test-utils';
import { AUTOCLOSE_TIME } from '../autoClose';
import Notification from '../baseNotification.vue';

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

  expect(wrapper.find('.notification').exists()).toBeTruthy();

  expect(wrapper.find('.notification').text()).toBe('hello');
  expect(wrapper.find('.notification-button').exists()).toBeTruthy();
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
  expect(wrapper.find('.notification').classes()).toEqual(['notification', 'notification__selected']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.notification').classes()).toEqual(['notification']);
});

it('baseNotification auto closes', () => {
  jest.useFakeTimers();
  const fakeCallback = jest.fn();
  wrapper = mount(Notification, {
    props: {
      closeHandler: fakeCallback,
    },
  });
  expect(wrapper.find('.notification').exists()).toBeTruthy();
  expect(fakeCallback).toBeCalledTimes(0);

  jest.advanceTimersByTime(AUTOCLOSE_TIME);
  expect(fakeCallback).toBeCalledTimes(1);
});

it('closes', () => {
  const fakeCallback = jest.fn();
  wrapper = mount(Notification, {
    props: {
      closeHandler: fakeCallback,
    },
  });
  expect(wrapper.find('.notification').exists()).toBeTruthy();
  expect(fakeCallback).toBeCalledTimes(0);

  wrapper.find('button').trigger('click');
  expect(fakeCallback).toBeCalledTimes(1);
});
