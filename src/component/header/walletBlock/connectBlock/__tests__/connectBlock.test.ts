import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore } from 'vuex';
import ConnectBlock from '../connectBlock.vue';

let wrapper = mount(ConnectBlock, {});
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('connectBlock renders', () => {
  wrapper = mount(ConnectBlock);

  expect(wrapper.find('div').classes()).toEqual(['connectBlock']);
  expect(wrapper.find('button').classes()).toEqual(['connectBlock-button']);
  expect(wrapper.find('button').text()).toBe('Connect wallet');
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
      ConnectBlock,
    },

    template: `
      <div class='root'>
        <ConnectBlock :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);

  expect(wr.find('.connectBlock').classes()).toEqual(['connectBlock']);
  expect(wr.find('.connectBlock-button').classes()).toEqual(['connectBlock-button']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.connectBlock').classes()).toEqual(['connectBlock', 'connectBlock__selected']);
  expect(wr.find('.connectBlock-button').classes()).toEqual(['connectBlock-button', 'connectBlock-button__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.connectBlock').classes()).toEqual(['connectBlock']);
  expect(wr.find('.connectBlock-button').classes()).toEqual(['connectBlock-button']);

  wr.unmount();
});

it('click sends data to outer store', async () => {
  const store = createStore({
    state: {
      clicked: false,
    },
    mutations: {
      click: (state) => { state.clicked = true; },
    },
  });

  wrapper = mount(ConnectBlock, {
    props: {
      onClick: store.commit.bind('click'),
    },
  });

  expect(store.state.clicked).toBeFalsy();

  await wrapper.find('button').trigger('click');
  expect(store.state.clicked).toBeTruthy();
});
