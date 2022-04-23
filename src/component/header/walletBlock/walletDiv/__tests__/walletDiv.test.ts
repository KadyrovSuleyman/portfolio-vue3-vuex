import { mount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import WalletDiv from '../walletDiv.vue';

jest.mock('../adapter');
jest.mock('../logic');

let wrapper: VueWrapper<any>;
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
  wrapper = mount(WalletDiv, { global: { plugins: [createStore({})] } });
  expect(wrapper.find('.walletDiv').classes()).toEqual(['walletDiv']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.walletDiv').classes()).toEqual(['walletDiv', 'walletDiv__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.walletDiv').classes()).toEqual(['walletDiv']);
});

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
