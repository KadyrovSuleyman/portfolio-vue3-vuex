import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import { createStore } from 'vuex';
import NavButton from '../navButton.vue';

let wrapper = mount(NavButton, { global: { plugins: [createStore({})] } });
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('navButton renders', () => {
  wrapper = mount(NavButton);

  expect(wrapper.find('div').classes()).toEqual(['navButton']);
  expect(wrapper.find('.navButton-link').classes()).toEqual(['navButton-link']);
  expect(wrapper.find('.navButton-rectangle').classes()).toEqual(['navButton-rectangle']);
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
      NavButton,
    },

    template: `
      <div class='root'>
        <NavButton :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.navButton').classes()).toEqual(['navButton']);
  expect(wr.find('.navButton-link').classes()).toEqual(['navButton-link']);
  expect(wr.find('.navButton-rectangle').classes()).toEqual(['navButton-rectangle']);

  await wr.find('.test-btn').trigger('click');

  expect(wr.find('.navButton').classes()).toEqual(['navButton', 'navButton__selected']);
  expect(wr.find('.navButton-link').classes()).toEqual(['navButton-link', 'navButton-link__selected']);
  expect(wr.find('.navButton-rectangle').classes())
    .toEqual(['navButton-rectangle', 'navButton-rectangle__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.navButton').classes()).toEqual(['navButton']);
  expect(wr.find('.navButton-link').classes()).toEqual(['navButton-link']);
  expect(wr.find('.navButton-rectangle').classes()).toEqual(['navButton-rectangle']);

  wr.unmount();
});

it('link generates', () => {
  wrapper = mount(NavButton);
  expect(wrapper.find('a').attributes('href')).toBe('#');
  wrapper.unmount();

  wrapper = mount(NavButton, {
    props: {
      URL: '/test',
    },
  });
  expect(wrapper.find('a').attributes('href')).toBe('/test');
});

it('click triggers', async () => {
  const mockFunc = jest.fn();
  wrapper = mount(NavButton, {
    props: {
      onClick: mockFunc,
    },
  });

  await wrapper.find('a').trigger('click');
  await wrapper.find('a').trigger('click');

  expect(mockFunc).toBeCalledTimes(2);
});
