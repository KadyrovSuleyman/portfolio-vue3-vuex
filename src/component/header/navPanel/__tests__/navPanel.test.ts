import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import NavPanel from '../navPanel.vue';

let wrapper = mount(NavPanel);
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('navButton renders', () => {
  wrapper = mount(NavPanel);

  expect(wrapper.find('div').classes()).toEqual(['navPanel']);
  expect(wrapper.find('.navPanel-navButton').exists()).toBeTruthy();
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
      NavPanel,
    },

    template: `
      <div class='root'>
        <NavPanel :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.navPanel').classes()).toEqual(['navPanel']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.navPanel').classes()).toEqual(['navPanel', 'navPanel__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.navPanel').classes()).toEqual(['navPanel']);

  wr.unmount();
});

// ============================

jest.mock('../logic', () => {
  const originalModule = jest.requireActual('../logic');

  originalModule.navItems.value = {
    Stacking: true,
    Bridge: false,
    SHO: false,
    SHON: false,
  };

  return {
    __esModule: true,
    ...originalModule,
  };
});

it('click handler works', async () => {
  wrapper = mount(NavPanel);
  expect(wrapper.find('.navButton-link__selected').text()).toBe('Stacking');
  expect(wrapper.findAll('.navButton-link__selected').length).toBe(1);

  await wrapper.findAll('.navButton-link')[1].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('Bridge');
  expect(wrapper.findAll('.navButton-link__selected').length).toBe(1);

  await wrapper.findAll('.navButton-link')[2].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('SHO');
  expect(wrapper.findAll('.navButton-link__selected').length).toBe(1);

  await wrapper.findAll('.navButton-link')[3].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('SHON');
  expect(wrapper.findAll('.navButton-link__selected').length).toBe(1);

  await wrapper.findAll('.navButton-link')[0].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('Stacking');
  expect(wrapper.findAll('.navButton-link__selected').length).toBe(1);
});

it('links generates', async () => {
  wrapper = mount(NavPanel);
  expect(wrapper.find('.navButton-link__selected').text()).toBe('Stacking');
  expect(wrapper.find('.navButton-link__selected').attributes('href')).toBe('/stacking');

  await wrapper.findAll('.navButton-link')[1].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('Bridge');
  expect(wrapper.find('.navButton-link__selected').attributes('href')).toBe('/bridge');

  await wrapper.findAll('.navButton-link')[2].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('SHO');
  expect(wrapper.find('.navButton-link__selected').attributes('href')).toBe('/sho');

  await wrapper.findAll('.navButton-link')[3].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('SHON');
  expect(wrapper.find('.navButton-link__selected').attributes('href')).toBe('/shon');

  await wrapper.findAll('.navButton-link')[0].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('Stacking');
  expect(wrapper.find('.navButton-link__selected').attributes('href')).toBe('/stacking');
});
