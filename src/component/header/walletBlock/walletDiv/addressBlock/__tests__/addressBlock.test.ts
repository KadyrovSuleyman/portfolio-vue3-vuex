import { mount, VueWrapper } from '@vue/test-utils';
import { ref } from 'vue';
import { createStore } from 'vuex';
import AddressBlock from '../addressBlock.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('connectBlock renders', () => {
  wrapper = mount(AddressBlock);

  expect(wrapper.find('div').classes()).toEqual(['addressBlock']);
  expect(wrapper.find('span').classes()).toEqual(['addressBlock-span']);
  expect(wrapper.find('button').classes()).toEqual(['addressBlock-button', 'addressBlock-button__icon_copy']);
});

it('watchs props changes', async () => {
  wrapper = mount(AddressBlock);
  expect(wrapper.find('.addressBlock').classes()).toEqual(['addressBlock']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.addressBlock').classes()).toEqual(['addressBlock', 'addressBlock__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.addressBlock').classes()).toEqual(['addressBlock']);
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
