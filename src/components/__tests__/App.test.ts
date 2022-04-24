import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import App from '../App.vue';

jest.mock('../StakingAppBlock/state');
jest.mock('../StakingAppBlock/ActionsBlock/state.ts');
jest.mock('../StakingAppBlock/CalculatorBlock/state.ts');
jest.mock('../StakingAppBlock/StakeInfoBlock/InfoContainer/state.ts');
jest.mock('../StakingAppBlock/StakeInfoBlock/state.ts');
jest.mock('../StakingAppBlock/TariffsBlock/state.ts');

jest.mock('../Header/WalletBlock/WalletDiv/state.ts');
jest.mock('../Header/WalletBlock/state.ts');

jest.mock('../Modals/ConnectWalletModal/WalletsList/state.ts');
jest.mock('../Modals/ConnectWalletModal/state.ts');
jest.mock('../Modals/Copied/state.ts');
jest.mock('../Modals/ReplenishModal/Calculator/state.ts');
jest.mock('../Modals/ReplenishModal/state.ts');
jest.mock('../Modals/TransactionConfirmed/state.ts');

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
