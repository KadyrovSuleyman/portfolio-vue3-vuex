import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import WalletsList from '../WalletsList.vue';

jest.mock('../state.ts');

let store: Store<any>;
let wrapper: VueWrapper<any>;

beforeEach(() => {
  store = createStore({
    state: {
      walletsList: [
        {
          name: 'MetaMask',
          icon: 'icon/metaMask.svg',
        },
        {
          name: 'Walletconnect',
          icon: 'icon/walletconnect.svg',
        },
      ],
    },
    mutations: {
      add: (state, item: any) => { state.walletsList.push(item); },
      delete: (state, index: number) => { state.walletsList.splice(index, 1); },
      change: (state, index: number) => {
        state.walletsList[index].name = 'changed name';
        state.walletsList[index].icon = 'changed icon';
      },
    },
  });
});
afterEach(() => {
  store = createStore({});
  wrapper.unmount();
});

// ===========================

it('walletsList renders', () => {
  wrapper = mount(WalletsList, { global: { plugins: [store] } });
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(WalletsList, { global: { plugins: [store] } });
  expect(wrapper.find('.walletsList').classes()).toEqual(['walletsList']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.walletsList').classes()).toEqual([
    'walletsList',
    'walletsList__selected',
  ]);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.walletsList').classes()).toEqual(['walletsList']);
});

describe('outer store changing', () => {
  it('adding item', async () => {
    wrapper = mount(WalletsList, {
      global: { plugins: [store] },
    });

    expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(2);

    store.commit('add', {
      name: 'scum name',
      icon: 'scum icon',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(3);
    expect(wrapper.element.outerHTML).toMatchSnapshot();
  });

  it('deleting item', async () => {
    wrapper = mount(WalletsList, {
      global: { plugins: [store] },
    });

    expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(2);

    store.commit('delete', 1);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(1);

    store.commit('delete', 0);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(0);
  });

  it('changing item', async () => {
    wrapper = mount(WalletsList, {
      global: { plugins: [store] },
    });

    expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(2);

    store.commit('change', 0);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(2);
    expect(wrapper.element.outerHTML).toMatchSnapshot();
  });
});
