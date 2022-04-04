import { mount, VueWrapper } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore, Store } from 'vuex';
import CalculatorBlock from '../calculatorBlock.vue';

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
      isStaked: false,
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

// =================================
it('infoBlock renders', () => {
  wrapper = mount(CalculatorBlock, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.calculatorBlock').classes()).toEqual(['calculatorBlock']);
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
      CalculatorBlock,
    },

    template: `
      <div class='root'>
        <CalculatorBlock :mods="mods" />
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, {
    global: { plugins: [store] },
  });
  expect(wr.find('.calculatorBlock').classes()).toEqual(['calculatorBlock']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.calculatorBlock').classes()).toEqual(['calculatorBlock', 'calculatorBlock__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.calculatorBlock').classes()).toEqual(['calculatorBlock']);

  wr.unmount();
});

it('watching outer store', async () => {
  wrapper = mount(CalculatorBlock, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.calculatorBlock').exists()).toBeTruthy();

  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeTruthy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeFalsy();
  expect(wrapper.find('.infoBlock-span').text()).toContain('connect');

  store.commit('change', {
    isWalletConnected: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeTruthy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeFalsy();
  expect(wrapper.find('.infoBlock-span').text()).toContain('approve');

  store.commit('change', {
    isWalletApproved: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeTruthy();

  store.commit('change', {
    isStaked: true,
  });
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.calculatorBlock-infoBlock').exists()).toBeFalsy();
  expect(wrapper.find('.calculatorBlock-calculator').exists()).toBeFalsy();
});
