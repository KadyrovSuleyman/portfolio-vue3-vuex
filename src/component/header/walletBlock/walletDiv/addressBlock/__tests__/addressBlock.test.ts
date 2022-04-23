import { mount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import AddressBlock from '../addressBlock.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('connectBlock renders', () => {
  wrapper = mount(AddressBlock);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
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
  const wr = mount({
    data() {
      return {
        text: 'before',
      };
    },
    methods: {
      change() {
        this.text = 'after';
      },
    },
    components: {
      AddressBlock,
    },
    template: `
      <div>
        <AddressBlock>{{ text }}</AddressBlock>
        <button class="test-btn" @click="change"></button>
      </div>
    `,
  });
  expect(wr.find('span').text()).toBe('before');

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('span').text()).toBe('after');

  wr.unmount();
});
