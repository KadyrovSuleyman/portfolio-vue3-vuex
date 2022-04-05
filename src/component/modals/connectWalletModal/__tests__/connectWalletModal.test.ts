import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore } from 'vuex';
import Modal from '../connectWalletModal.vue';

let wrapper = mount(Modal, {
  global: { plugins: [createStore({})] },
});
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('connectWalletModal renders', () => {
  wrapper = mount(Modal, {
    global: { plugins: [createStore({})] },
  });

  expect(wrapper.find('.connectWalletModal').classes()).toEqual(['connectWalletModal']);

  expect(wrapper.find('.connectWalletModal-header').exists()).toBeTruthy();
  expect(wrapper.find('.connectWalletModal-explanation').exists()).toBeTruthy();
  expect(wrapper.find('.connectWalletModal-walletsList').exists()).toBeTruthy();
  expect(wrapper.find('.connectWalletModal-button').exists()).toBeTruthy();
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
      Modal,
    },

    template: `
      <div class='root'>
        <Modal :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div, {
    global: { plugins: [createStore({})] },
  });
  expect(wr.find('.connectWalletModal').classes()).toEqual(['connectWalletModal']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.connectWalletModal').classes()).toEqual(['connectWalletModal', 'connectWalletModal__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.connectWalletModal').classes()).toEqual(['connectWalletModal']);

  wr.unmount();
});
