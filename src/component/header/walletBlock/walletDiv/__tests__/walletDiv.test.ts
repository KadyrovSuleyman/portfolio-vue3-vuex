import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore } from 'vuex';
import WalletDiv from '../walletDiv.vue';

let wrapper = mount(WalletDiv);
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('connectBlock renders', () => {
  wrapper = mount(WalletDiv);

  expect(wrapper.find('div').classes()).toEqual(['walletDiv']);
  expect(wrapper.find('.walletDiv-addressBlock').classes()).toEqual(['walletDiv-addressBlock']);
  expect(wrapper.find('.walletDiv-span').classes()).toEqual(['walletDiv-span']);
  expect(wrapper.find('.walletDiv-button__icon_coin').classes())
    .toEqual(['walletDiv-button', 'walletDiv-button__icon_coin']);
  expect(wrapper.find('.walletDiv-button__icon_chevron').classes())
    .toEqual(['walletDiv-button', 'walletDiv-button__icon_chevron']);
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
      WalletDiv,
    },

    template: `
      <div class='root'>
        <WalletDiv :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.walletDiv').classes()).toEqual(['walletDiv']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletDiv').classes()).toEqual(['walletDiv', 'walletDiv__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletDiv').classes()).toEqual(['walletDiv']);

  wr.unmount();
});

// it('click sends data to outer store', async () => {
//   const store = createStore({
//     state: {
//       clicked: false,
//     },
//     mutations: {
//       click: (state) => { state.clicked = true; },
//     },
//   });

//   wrapper = mount(AddressBlock, {
//     global: {
//       plugins: [store],
//     },
//     props: {
//       onClick: store.commit.bind('click'),
//     },
//   });

//   expect(store.state.clicked).toBeFalsy();

//   await wrapper.find('button').trigger('click');
//   expect(store.state.clicked).toBeTruthy();
// });
