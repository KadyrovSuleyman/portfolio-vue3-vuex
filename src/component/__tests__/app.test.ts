import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import App from '../app.vue';

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    modules: {
      modal: {
        state: {
          connectWallet: false,
        },
      },
      tariff: {
        state: {
          list: [],
        },
      },
      wallet: {
        state: {
          isWalletConnected: false,
          isWalletApproved: false,
        },
      },
      stake: {
        state: {
          isStaked: false,
        },
      },
    },
    mutations: {
      change: (state, obj: { [name: string]: boolean | string }) => {
        Object.keys(obj).forEach((index) => {
          state[index] = obj[index];
        });
      },
    },
  });
});

beforeEach(() => {
  const el = document.createElement('div');
  el.className = 'app';
  document.body.appendChild(el);
});
afterEach(() => {
  document.body.outerHTML = '';
});

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('app renders', () => {
  wrapper = mount(App, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.app').classes()).toEqual(['app']);

  expect(wrapper.find('.app-header').exists()).toBeTruthy();
  expect(wrapper.find('.app-headerBorder').exists()).toBeTruthy();
  expect(wrapper.find('.app-stakingAppBlock').exists()).toBeTruthy();
  expect(wrapper.find('.app-footer').exists()).toBeTruthy();
});

it('watchs props changes', async () => {
  wrapper = mount(App, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.app').classes()).toEqual(['app']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.app').classes()).toEqual(['app', 'app__selected']);

  wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.app').classes()).toEqual(['app']);
});
