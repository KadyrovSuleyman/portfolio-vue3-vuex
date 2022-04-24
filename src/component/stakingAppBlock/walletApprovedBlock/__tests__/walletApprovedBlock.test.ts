import { mount, VueWrapper } from '@vue/test-utils';
import WalletApprovedBlock from '../walletApprovedBlock.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('walletApprovedBlock renders', () => {
  wrapper = mount(WalletApprovedBlock);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(WalletApprovedBlock);
  expect(wrapper.find('.walletApprovedBlock').classes()).toEqual(['walletApprovedBlock']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.walletApprovedBlock').classes()).toEqual(['walletApprovedBlock', 'walletApprovedBlock__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.walletApprovedBlock').classes()).toEqual(['walletApprovedBlock']);
});
