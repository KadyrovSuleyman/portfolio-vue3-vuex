import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import App from '../app.vue';

let wrapper = mount(App);
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('app renders', () => {
  wrapper = mount(App);

  expect(wrapper.find('.app').classes()).toEqual(['app']);

  expect(wrapper.find('.app-header').exists()).toBeTruthy();
  expect(wrapper.find('.app-headerBorder').exists()).toBeTruthy();
  expect(wrapper.find('.app-stakingAppBlock').exists()).toBeTruthy();
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
      App,
    },

    template: `
      <div class='root'>
        <App :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.app').classes()).toEqual(['app']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.app').classes()).toEqual(['app', 'app__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.app').classes()).toEqual(['app']);

  wr.unmount();
});
