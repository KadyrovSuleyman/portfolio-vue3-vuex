import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import Tip from '../tip.vue';

let wrapper = mount(Tip);
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('tip renders', () => {
  wrapper = mount(Tip);

  expect(wrapper.find('.tip').classes()).toEqual(['tip']);
  expect(wrapper.find('.tip-triangle').classes()).toEqual(['tip-triangle']);
  expect(wrapper.find('.tip-div').classes()).toEqual(['tip-div']);
  expect(wrapper.find('.tip-span').classes()).toEqual(['tip-span']);
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
      Tip,
    },

    template: `
      <div class='root'>
        <Tip :mods="mods">test-tip</Tip>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.tip').classes()).toEqual(['tip']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tip').classes()).toEqual(['tip', 'tip__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.tip').classes()).toEqual(['tip']);

  expect(wr.find('.tip-span').text()).toBe('test-tip');

  wr.unmount();
});
