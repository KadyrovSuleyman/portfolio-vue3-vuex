import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import WalletBlock from '../walletBlock.vue';

let wrapper = mount(WalletBlock, { global: { plugins: [createStore({})] } });
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('walletBlock renders', () => {
  wrapper = mount(WalletBlock, { global: { plugins: [createStore({})] } });

  expect(wrapper.find('div').classes()).toEqual(['walletBlock']);
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
      WalletBlock,
    },

    template: `
      <div class='root'>
        <WalletBlock :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, { global: { plugins: [createStore({})] } });
  expect(wr.find('.walletBlock').classes()).toEqual(['walletBlock']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletBlock').classes()).toEqual(['walletBlock', 'walletBlock__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletBlock').classes()).toEqual(['walletBlock']);

  wr.unmount();
});

// =========================================
jest.mock('../adapter', () => ({
  __esModule: true,
  default: (store: Store<any>) => ({
    isWalletConnect: store.state.connect,
  }),
}));

it('walletBlock if wallet connected, connectBlock if dont', async () => {
  const store = createStore({
    state: {
      connect: false,
    },
    mutations: {
      changeConnection: (state) => { state.connect = !state.connect; },
    },
  });

  wrapper = mount(WalletBlock, {
    global: {
      plugins: [store],
    },
  });

  expect(wrapper.find('.walletBlock-walletDiv').exists()).toBeFalsy();
  expect(wrapper.find('.walletBlock-connectBlock').exists()).toBeTruthy();

  store.commit('changeConnection');
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.walletBlock-walletDiv').exists()).toBeTruthy();
  expect(wrapper.find('.walletBlock-connectBlock').exists()).toBeFalsy();

  store.commit('changeConnection');
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.walletBlock-walletDiv').exists()).toBeFalsy();
  expect(wrapper.find('.walletBlock-connectBlock').exists()).toBeTruthy();
});
