import { mount, VueWrapper } from '@vue/test-utils';
import WaitingIcon from '../WaitingIcon.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('waitingIcon renders', () => {
  wrapper = mount(WaitingIcon);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(WaitingIcon);
  expect(wrapper.find('.waitingIcon').classes()).toEqual(['waitingIcon']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.waitingIcon').classes()).toEqual([
    'waitingIcon',
    'waitingIcon__selected',
  ]);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.waitingIcon').classes()).toEqual(['waitingIcon']);
});
