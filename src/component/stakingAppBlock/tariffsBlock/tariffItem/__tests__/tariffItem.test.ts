import { mount, VueWrapper } from '@vue/test-utils';
import { ref } from 'vue';
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
  const Div = {
    props: [],

    setup() {
      const isSelected = ref<string | undefined>(undefined);
      const select = () => {
        isSelected.value = 'true';
      };
      const unselect = () => {
        isSelected.value = 'false';
      };
      const clean = () => {
        isSelected.value = undefined;
      };

      return {
        isSelected,
        select,
        unselect,
        clean,
      };
    },
    components: {
      TariffItem,
    },

    template: `
      <div class='root'>
        <TariffItem :selected="isSelected"
        />
        <button class="select-btn" @click="select"></button>
        <button class="unselect-btn" @click="unselect"></button>
        <button class="clean-btn" @click="clean"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.tariffItem').classes()).toEqual(['tariffItem']);

  await wr.find('.select-btn').trigger('click');
  expect(wr.find('.tariffItem').classes()).toEqual(['tariffItem', 'tariffItem__selected_true']);

  await wr.find('.unselect-btn').trigger('click');
  expect(wr.find('.tariffItem').classes()).toEqual(['tariffItem', 'tariffItem__selected_false']);

  await wr.find('.clean-btn').trigger('click');
  expect(wr.find('.tariffItem').classes()).toEqual(['tariffItem']);

  wr.unmount();
});
