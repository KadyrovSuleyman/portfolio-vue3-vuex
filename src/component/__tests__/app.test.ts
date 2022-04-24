import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import App from '../App.vue';

jest.mock('../StakingAppBlock/adapter');
jest.mock('../StakingAppBlock/ActionsBlock/adapter.ts');
jest.mock('../StakingAppBlock/CalculatorBlock/adapter.ts');
jest.mock('../StakingAppBlock/StakeInfoBlock/InfoContainer/adapter.ts');
jest.mock('../StakingAppBlock/StakeInfoBlock/adapter.ts');
jest.mock('../StakingAppBlock/TariffsBlock/adapter.ts');

jest.mock('../Header/WalletBlock/WalletDiv/adapter.ts');
jest.mock('../Header/WalletBlock/adapter.ts');

jest.mock('../Modals/ConnectWalletModal/WalletsList/adapter.ts');
jest.mock('../Modals/ConnectWalletModal/adapter.ts');
jest.mock('../Modals/Copied/adapter.ts');
jest.mock('../Modals/ReplenishModal/Calculator/adapter.ts');
jest.mock('../Modals/ReplenishModal/adapter.ts');
jest.mock('../Modals/TransactionConfirmed/adapter.ts');

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
