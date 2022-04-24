import { mount, VueWrapper } from '@vue/test-utils';
import NavPanel from '../NavPanel.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('navButton renders', () => {
  wrapper = mount(NavPanel);
  expect(wrapper.element.outerHTML).toMatchSnapshot();
});

describe('ad', () => {
  it('watchs props changes', async () => {
    wrapper = mount(NavPanel);
    expect(wrapper.find('.navPanel').classes()).toEqual(['navPanel']);

    await wrapper.setProps({
      mods: {
        selected: true,
      },
    });
    expect(wrapper.find('.navPanel').classes()).toEqual(['navPanel', 'navPanel__selected']);

    await wrapper.setProps({
      mods: {
        selected: false,
      },
    });
    expect(wrapper.find('.navPanel').classes()).toEqual(['navPanel']);

    wrapper.unmount();
  });
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

  await wrapper.findAll('.navButton-link')[0].trigger('click');
  expect(wrapper.find('.navButton-link__selected').text()).toBe('Stacking');
  expect(wrapper.find('.navButton-link__selected').attributes('href')).toBe('/stacking');
});
