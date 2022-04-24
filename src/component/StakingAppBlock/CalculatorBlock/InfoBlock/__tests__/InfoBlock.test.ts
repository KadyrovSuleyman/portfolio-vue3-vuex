import { mount, VueWrapper } from '@vue/test-utils';
import { computed, ref } from 'vue';
import InfoBlock from '../InfoBlock.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('infoBlock renders', () => {
  wrapper = mount(InfoBlock);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
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
      InfoBlock,
    },

    template: `
      <div class='root'>
        <InfoBlock :mods="mods">{{ String(isSelected) }}</InfoBlock>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.infoBlock').classes()).toEqual(['infoBlock']);
  expect(wr.text()).toBe('false');

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.infoBlock').classes()).toEqual(['infoBlock', 'infoBlock__selected']);
  expect(wr.text()).toBe('true');

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.infoBlock').classes()).toEqual(['infoBlock']);
  expect(wr.text()).toBe('false');

  wr.unmount();
});
