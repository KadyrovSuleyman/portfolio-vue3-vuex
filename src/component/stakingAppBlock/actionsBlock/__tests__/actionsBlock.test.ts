import { mount, VueWrapper } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import ActionsBlock from '../actionsBlock.vue';

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
afterEach(() => {
  wrapper.unmount();
});

// ==================================
it('waitingIcon renders', () => {
  wrapper = mount(ActionsBlock, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.actionsBlock').classes()).toEqual(['actionsBlock']);
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
      ActionsBlock,
    },

    template: `
      <div class='root'>
        <ActionsBlock :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, {
    global: { plugins: [store] },
  });
  expect(wr.find('.actionsBlock').classes()).toEqual(['actionsBlock']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.actionsBlock').classes()).toEqual(['actionsBlock', 'actionsBlock__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.actionsBlock').classes()).toEqual(['actionsBlock']);

  wr.unmount();
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
  expect(wrapper.find('.timeButton-span').exists()).toBeFalsy();
  expect(wrapper.find('.unstakeButton-span').exists()).toBeTruthy();
  expect(wrapper.find('.mainButton-span').text()).toBe('Restake');
  expect(wrapper.find('.unstakeButton-span').text()).toBe('Unstake');

  store.commit('change', {
    isRestakeAvailable: false,
    isReplenishAvailable: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.timeButton-span').exists()).toBeTruthy();
  expect(wrapper.find('.unstakeButton-span').exists()).toBeFalsy();
  expect(wrapper.find('.mainButton-span').text()).toBe('Replenish');
  expect(wrapper.find('.timeButton-span').text()).toBe('00:00:09');
});
