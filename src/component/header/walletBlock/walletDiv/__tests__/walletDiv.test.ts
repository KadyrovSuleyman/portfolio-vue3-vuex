import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import WalletDiv from '../walletDiv.vue';

let wrapper = mount(WalletDiv, { global: { plugins: [createStore({})] } });
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('connectBlock renders', () => {
  wrapper = mount(WalletDiv, { global: { plugins: [createStore({})] } });

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
  const wr = mount(Div, { global: { plugins: [createStore({})] } });
  expect(wr.find('.walletDiv').classes()).toEqual(['walletDiv']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletDiv').classes()).toEqual(['walletDiv', 'walletDiv__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletDiv').classes()).toEqual(['walletDiv']);

  wr.unmount();
});

jest.mock('../adapter', () => {
  const vue = jest.requireActual('vue');
  return {
    __esModule: true,
    default: (store: Store<any>) => ({
      address: vue.computed(() => store.state.address),
      balance: vue.computed(() => store.state.balance),
    }),
  };
});

// =========================================
describe('outer store', () => {
  it('changeAddress -> changeBalance', async () => {
    const store = createStore({
      state: {
        address: 'first-address',
        balance: 'first-balance',
      },
      mutations: {
        changeAddress: (state) => { state.address = 'second-address'; },
        changeBalance: (state) => { state.balance = 'second-balance'; },
      },
    });

    wrapper = mount(WalletDiv, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('.addressBlock-span').text()).toBe('first-address');
    expect(wrapper.find('.walletDiv-span').text()).toBe('first-balance');

    store.commit('changeAddress');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.addressBlock-span').text()).toBe('second-address');
    expect(wrapper.find('.walletDiv-span').text()).toBe('first-balance');

    store.commit('changeBalance');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.addressBlock-span').text()).toBe('second-address');
    expect(wrapper.find('.walletDiv-span').text()).toBe('second-balance');
  });

  it('changeBalance -> changeAddress', async () => {
    const store = createStore({
      state: {
        address: 'first-address',
        balance: 'first-balance',
      },
      mutations: {
        changeAddress: (state) => { state.address = 'second-address'; },
        changeBalance: (state) => { state.balance = 'second-balance'; },
      },
    });

    wrapper = mount(WalletDiv, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('.addressBlock-span').text()).toBe('first-address');
    expect(wrapper.find('.walletDiv-span').text()).toBe('first-balance');

    store.commit('changeBalance');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.addressBlock-span').text()).toBe('first-address');
    expect(wrapper.find('.walletDiv-span').text()).toBe('second-balance');

    store.commit('changeAddress');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.addressBlock-span').text()).toBe('second-address');
    expect(wrapper.find('.walletDiv-span').text()).toBe('second-balance');
  });
});
