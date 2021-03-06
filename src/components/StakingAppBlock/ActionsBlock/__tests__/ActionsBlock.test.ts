import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import ActionsBlock from '../ActionsBlock.vue';

jest.mock('../state');

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      isWalletConnected: false,
      isWalletApproved: false,
      isWaiting: false,
      isStaked: false,
      isReplenishAvailable: false,
      isRestakeAvailable: false,
      restakeCountdown: '00:00:09',
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

it('waitingIcon renders', () => {
  wrapper = mount(ActionsBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

it('watchs props changes', async () => {
  wrapper = mount(ActionsBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.actionsBlock').classes()).toEqual(['actionsBlock']);

  await wrapper.setProps(
    { mods: { selected: true } },
  );
  expect(wrapper.find('.actionsBlock').classes()).toEqual([
    'actionsBlock',
    'actionsBlock__selected',
  ]);

  await wrapper.setProps(
    { mods: { selected: false } },
  );
  expect(wrapper.find('.actionsBlock').classes()).toEqual(['actionsBlock']);
});

it('main button watch the store', async () => {
  wrapper = mount(ActionsBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.mainButton-span').text()).toBe('Connect wallet');

  store.commit('change', {
    isWaiting: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.mainButton-span').text()).toBe('Waiting');

  store.commit('change', {
    isWaiting: false,
    isWalletConnected: true,
    isWalletApproved: true,
    isStaked: true,
  });
  store.commit('change', {
    isRestakeAvailable: true,
    isReplenishAvailable: false,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();

  store.commit('change', {
    isRestakeAvailable: false,
    isReplenishAvailable: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});
