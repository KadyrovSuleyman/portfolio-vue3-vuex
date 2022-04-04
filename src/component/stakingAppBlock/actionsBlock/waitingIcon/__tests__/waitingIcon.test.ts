import { mount, VueWrapper } from '@vue/test-utils';
import { computed, ref } from 'vue';
import WaitingIcon from '../waitingIcon.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('waitingIcon renders', () => {
  wrapper = mount(WaitingIcon);

  expect(wrapper.find('.waitingIcon').classes()).toEqual(['waitingIcon']);
  expect(wrapper.find('.fill').exists()).toBeTruthy();
  expect(wrapper.find('.active').exists()).toBeTruthy();
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
      WaitingIcon,
    },

    template: `
      <div class='root'>
        <WaitingIcon :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.waitingIcon').classes()).toEqual(['waitingIcon']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.waitingIcon').classes()).toEqual(['waitingIcon', 'waitingIcon__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.waitingIcon').classes()).toEqual(['waitingIcon']);

  wr.unmount();
});
