import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import TariffItem from '../tariffItem.vue';

let wrapper = mount(TariffItem);
wrapper.unmount();
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
  const Div = {
    props: [],

    setup() {
      const isSelected = ref(false);
      const select = () => {
        isSelected.value = !isSelected.value;
      };
      const mods = computed(() => ({ selected: isSelected.value }));

      return {
        isSelected,
        select,
        mods,
      };
    },
    components: {
      TariffItem,
    },

    template: `
      <div class='root'>
        <TariffItem :mods="mods" :period="'period'"
          :apy="'apy'" :amount="'amount'"
        />
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.tariffItem').classes()).toEqual(['tariffItem']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tariffItem').classes()).toEqual(['tariffItem', 'tariffItem__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tariffItem').classes()).toEqual(['tariffItem']);

  expect(wr.find('.tariffItem-period').text()).toBe('period');
  expect(wr.find('.tariffItem-apy').text()).toBe('APY: apy');
  expect(wr.find('.tariffItem-amount').text()).toBe('Amount: amount');

  wr.unmount();
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
