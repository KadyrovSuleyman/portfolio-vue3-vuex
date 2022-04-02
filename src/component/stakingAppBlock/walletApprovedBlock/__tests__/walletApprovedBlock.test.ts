import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import WalletApprovedBlock from '../walletApprovedBlock.vue';

let wrapper = mount(WalletApprovedBlock);
wrapper.unmount();
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
      WalletApprovedBlock,
    },

    template: `
      <div class='root'>
        <WalletApprovedBlock :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.walletApprovedBlock').classes()).toEqual(['walletApprovedBlock']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletApprovedBlock').classes()).toEqual(['walletApprovedBlock', 'walletApprovedBlock__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletApprovedBlock').classes()).toEqual(['walletApprovedBlock']);

  wr.unmount();
});
