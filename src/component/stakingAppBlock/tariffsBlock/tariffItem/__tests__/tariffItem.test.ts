import { mount, VueWrapper } from '@vue/test-utils';
import TariffItem from '../tariffItem.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('tariffItem renders', () => {
  wrapper = mount(TariffItem);

  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem']);
  expect(wrapper.find('.tariffItem-period').classes()).toEqual(['tariffItem-period']);
  expect(wrapper.find('.tariffItem-apyDiv').classes()).toEqual(['tariffItem-apyDiv']);
  expect(wrapper.find('.tariffItem-apy').classes()).toEqual(['tariffItem-apy']);
  expect(wrapper.find('.tariffItem-question').classes())
    .toEqual(['tariffItem-question', 'tariffItem-question__icon_question']);
  expect(wrapper.find('.tariffItem-amount').classes()).toEqual(['tariffItem-amount']);
});

it('watchs props changes', async () => {
  wrapper = mount(TariffItem);
  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem', 'tariffItem__selected']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem']);

  await wrapper.setProps({
    ...wrapper.props,
    period: 30,
    apy: 100,
    amountMin: 100,
    amountMax: 1000,
  });
  expect(wrapper.find('.tariffItem-period').text()).toBe('30 Days');
  expect(wrapper.find('.tariffItem-apy').text()).toBe('APY: 100%');
  expect(wrapper.find('.tariffItem-amount').text()).toBe('Amount: 100 - 1000 TKN');
});

it('tip shows on mouse hover', async () => {
  wrapper = mount(TariffItem);
  expect(wrapper.find('.tariffItem-tip').exists()).toBeFalsy();

  await wrapper.find('.tariffItem-question').trigger('mouseenter');
  expect(wrapper.find('.tariffItem-tip').exists()).toBeTruthy();

  await wrapper.find('.tariffItem-question').trigger('mouseleave');
  expect(wrapper.find('.tariffItem-tip').exists()).toBeFalsy();
});

it('watchs selected props change', async () => {
  wrapper = mount(TariffItem);
  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem']);

  await wrapper.setProps({
    selected: 'true',
  });
  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem', 'tariffItem__selected_true']);

  await wrapper.setProps({
    selected: 'false',
  });
  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem', 'tariffItem__selected_false']);

  await wrapper.setProps({
    selected: undefined,
  });
  expect(wrapper.find('.tariffItem').classes()).toEqual(['tariffItem']);
});
