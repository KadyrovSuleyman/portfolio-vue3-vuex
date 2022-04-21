import { mount, VueWrapper } from '@vue/test-utils';
import WalletApprovedBlock from '../walletApprovedBlock.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('walletApprovedBlock renders', () => {
  wrapper = mount(WalletApprovedBlock);

  expect(wrapper.find('.walletApprovedBlock').classes()).toEqual(['walletApprovedBlock']);
  expect(wrapper.find('.walletApprovedBlock-span').classes()).toEqual(['walletApprovedBlock-span']);
  expect(wrapper.find('.walletApprovedBlock-div').classes())
    .toEqual(['walletApprovedBlock-div', 'walletApprovedBlock-div__icon_check']);

  expect(wrapper.find('.walletApprovedBlock-span').text()).toBe('Wallet approved');
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
