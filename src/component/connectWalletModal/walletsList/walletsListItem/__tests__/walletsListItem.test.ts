import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import Item from '../walletsListItem.vue';

let wrapper = mount(Item);
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('connectWalletModal renders', () => {
  wrapper = mount(Item);

  expect(wrapper.find('.walletsListItem').classes()).toEqual(['walletsListItem']);

  expect(wrapper.find('.walletsListItem-icon').exists()).toBeTruthy();
  expect(wrapper.find('.walletsListItem-span').exists()).toBeTruthy();
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
      Item,
    },

    template: `
      <div class='root'>
        <Item :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.walletsListItem').classes()).toEqual(['walletsListItem']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletsListItem').classes()).toEqual(['walletsListItem', 'walletsListItem__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletsListItem').classes()).toEqual(['walletsListItem']);

  wr.unmount();
});
