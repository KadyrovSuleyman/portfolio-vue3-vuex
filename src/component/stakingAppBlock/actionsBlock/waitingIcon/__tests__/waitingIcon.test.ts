import { mount, VueWrapper } from '@vue/test-utils';
import WaitingIcon from '../waitingIcon.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('waitingIcon renders', () => {
  wrapper = mount(WaitingIcon);

  expect(wrapper.find('.waitingIcon').classes()).toEqual(['waitingIcon']);
  expect(wrapper.find('.fill').exists()).toBeTruthy();
  expect(wrapper.find('.active').exists()).toBeTruthy();
});

it('watchs props changes', async () => {
  wrapper = mount(WaitingIcon);
  expect(wrapper.find('.waitingIcon').classes()).toEqual(['waitingIcon']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.waitingIcon').classes()).toEqual(['waitingIcon', 'waitingIcon__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.waitingIcon').classes()).toEqual(['waitingIcon']);
});
