import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore } from 'vuex';
import AddressBlock from '../addressBlock.vue';

let wrapper = mount(AddressBlock);
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('connectBlock renders', () => {
  wrapper = mount(AddressBlock, { global: { plugins: [createStore({})] } });

  expect(wrapper.find('div').classes()).toEqual(['addressBlock']);
  expect(wrapper.find('span').classes()).toEqual(['addressBlock-span']);
  expect(wrapper.find('button').classes()).toEqual(['addressBlock-button', 'addressBlock-button__icon_copy']);
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
      AddressBlock,
    },

    template: `
      <div class='root'>
        <AddressBlock :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.addressBlock').classes()).toEqual(['addressBlock']);
  expect(wr.find('.addressBlock-span').classes()).toEqual(['addressBlock-span']);
  expect(wr.find('.addressBlock-button').classes())
    .toEqual(['addressBlock-button', 'addressBlock-button__icon_copy']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.addressBlock').classes()).toEqual(['addressBlock', 'addressBlock__selected']);
  expect(wr.find('.addressBlock-span').classes()).toEqual(['addressBlock-span', 'addressBlock-span__selected']);
  expect(wr.find('.addressBlock-button').classes())
    .toEqual(['addressBlock-button', 'addressBlock-button__icon_copy', 'addressBlock-button__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.addressBlock').classes()).toEqual(['addressBlock']);
  expect(wr.find('.addressBlock-span').classes()).toEqual(['addressBlock-span']);
  expect(wr.find('.addressBlock-button').classes())
    .toEqual(['addressBlock-button', 'addressBlock-button__icon_copy']);

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

  wrapper = mount(AddressBlock, {
    global: {
      plugins: [store],
    },
    props: {
      onClick: store.commit.bind('click'),
    },
  });

  expect(store.state.clicked).toBeFalsy();

  await wrapper.find('button').trigger('click');
  expect(store.state.clicked).toBeTruthy();
});

it('watchs changes from outer store', async () => {
  const Div = {
    props: [],

    setup() {
      const text = ref('before');
      const changeText = () => {
        text.value = 'after';
      };

      return {
        text,
        changeText,
      };
    },
    components: {
      AddressBlock,
    },

    template: `
      <div class='root'>
        <AddressBlock>{{ text }}</AddressBlock>
        <button class="test-btn" @click="changeText"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('span').text()).toBe('before');

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('span').text()).toBe('after');

  wr.unmount();
});
