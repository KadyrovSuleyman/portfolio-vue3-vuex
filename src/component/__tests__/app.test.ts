import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import App from '../app.vue';

jest.mock('../stakingAppBlock/adapter');
jest.mock('../stakingAppBlock/actionsBlock/adapter.ts');
jest.mock('../stakingAppBlock/calculatorBlock/adapter.ts');
jest.mock('../stakingAppBlock/stakeInfoBlock/infoContainer/adapter.ts');
jest.mock('../stakingAppBlock/stakeInfoBlock/adapter.ts');
jest.mock('../stakingAppBlock/tariffsBlock/adapter.ts');

jest.mock('../header/walletBlock/walletDiv/adapter.ts');
jest.mock('../header/walletBlock/adapter.ts');

jest.mock('../modals/connectWalletModal/walletsList/adapter.ts');
jest.mock('../modals/connectWalletModal/adapter.ts');
jest.mock('../modals/copied/adapter.ts');
jest.mock('../modals/replenishModal/calculator/adapter.ts');
jest.mock('../modals/replenishModal/adapter.ts');
jest.mock('../modals/transactionConfirmed/adapter.ts');

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({});
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
  expect(wrapper.element.outerHTML).toMatchSnapshot();
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
