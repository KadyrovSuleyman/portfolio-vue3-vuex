import { mount, VueWrapper } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import WalletsList from '../walletsList.vue';

jest.mock('../adapter', () => {
  const originalModule = jest.requireActual('../adapter');
  return {
    __esModule: true,
    ...originalModule,
    default: (store: Store<any>) => ({ ...store.state }),
  };
});

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
  expect(wrapper.find('.walletsList').classes()).toEqual(['walletsList']);

  expect(wrapper.findAll('.walletsList-walletsListItem').length).toBe(2);
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
      WalletsList,
    },

    template: `
      <div class='root'>
        <WalletsList :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, { global: { plugins: [store] } });
  expect(wr.find('.walletsList').classes()).toEqual(['walletsList']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletsList').classes()).toEqual(['walletsList', 'walletsList__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.walletsList').classes()).toEqual(['walletsList']);

  wr.unmount();
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
    const newItem = wrapper.findAll('.walletsList-walletsListItem')[2];
    expect(newItem.find('.walletsListItem-icon').attributes('src')).toBe('scum icon');
    expect(newItem.find('.walletsListItem-span').text()).toBe('scum name');
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
    const newItem = wrapper.findAll('.walletsList-walletsListItem')[0];
    expect(newItem.find('.walletsListItem-icon').attributes('src')).toBe('changed icon');
    expect(newItem.find('.walletsListItem-span').text()).toBe('changed name');
  });
});
