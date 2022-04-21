import { mount, VueWrapper } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import StakingAppBlock from '../stakingAppBlock.vue';

jest.mock('../adapter', () => {
  const originalModule = jest.requireActual('../adapter');
  return {
    __esModule: true,
    ...originalModule,
    adapt: (store: Store<any>) => ({ ...store.state }),
  };
});

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    modules: {
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

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

// =================================
it('stakingAppBlock renders', () => {
  wrapper = mount(StakingAppBlock, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.stakingAppBlock').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-header').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-calculatorBlock')
    .exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-actionsBlock')
    .exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-viewContractButton')
    .exists()).toBeTruthy();
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
      StakingAppBlock,
    },

    template: `
      <div class='root'>
        <StakingAppBlock :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, {
    global: { plugins: [store] },
  });
  expect(wr.find('.stakingAppBlock').classes()).toEqual(['stakingAppBlock']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.stakingAppBlock').classes()).toEqual(['stakingAppBlock', 'stakingAppBlock__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.stakingAppBlock').classes()).toEqual(['stakingAppBlock']);

  wr.unmount();
});

it('watching outer store', async () => {
  wrapper = mount(StakingAppBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.stakingAppBlock').exists()).toBeTruthy();

  expect(wrapper.find('.stakingAppBlock-walletApprovedBlock').exists()).toBeFalsy();

  store.commit('change', {
    isWalletApproved: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-walletApprovedBlock').exists()).toBeTruthy();

  store.commit('change', {
    isWalletApproved: false,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-walletApprovedBlock').exists()).toBeFalsy();

  expect(wrapper.find('.stakingAppBlock-stakeInfoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-bgImg').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-tariffsBlock').exists()).toBeTruthy();

  store.commit('change', {
    isStaked: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-stakeInfoBlock').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-bgImg').exists()).toBeTruthy();
  expect(wrapper.find('.stakingAppBlock-tariffsBlock').exists()).toBeFalsy();

  store.commit('change', {
    isStaked: false,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.stakingAppBlock-stakeInfoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-bgImg').exists()).toBeFalsy();
  expect(wrapper.find('.stakingAppBlock-tariffsBlock').exists()).toBeTruthy();
});
