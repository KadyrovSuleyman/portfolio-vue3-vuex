import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore } from 'vuex';
import Header from '../header.vue';

let wrapper = mount(Header, { global: { plugins: [createStore({})] } });
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('navButton renders', () => {
  wrapper = mount(Header, { global: { plugins: [createStore({})] } });

  expect(wrapper.find('header').classes()).toEqual(['header']);
  expect(wrapper.find('.header-navPanel').classes()).toEqual(['header-navPanel']);
  expect(wrapper.find('.header-walletBlock').classes()).toEqual(['header-walletBlock']);
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
      Header,
    },

    template: `
      <div class='root'>
        <Header :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, { global: { plugins: [createStore({})] } });
  expect(wr.find('header').classes()).toEqual(['header']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('header').classes()).toEqual(['header', 'header__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('header').classes()).toEqual(['header']);

  wr.unmount();
});
