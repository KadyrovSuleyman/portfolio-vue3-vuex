import { mount } from '@vue/test-utils';
import autoClose from '../autoClose';

jest.useFakeTimers();

it('closes after setted time', () => {
  const spy = jest.fn();
  const time = 3000;
  const wrapper = mount({
    setup() {
      autoClose(spy, time);
    },
    template: '<div></div>',
  });
  expect(spy).toBeCalledTimes(0);

  jest.advanceTimersByTime(time);
  expect(spy).toBeCalledTimes(1);
});

it('cleans on unmounted', () => {
  const spy = jest.fn();
  const time = 3000;
  const wrapper = mount({
    setup() {
      autoClose(spy, time);
    },
    template: '<div></div>',
  });
  expect(spy).toBeCalledTimes(0);

  wrapper.unmount();
  expect(spy).toBeCalledTimes(0);

  jest.advanceTimersByTime(time);
  expect(spy).toBeCalledTimes(0);
});
