import { mount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import InfoContainer from '../infoContainer.vue';

jest.mock('../adapter');

let store: Store<any>;
beforeEach(() => {
  store = createStore<any>({
    state: {
      From: '',
      To: '',
      Staked: 0,
      APY: '',
    },
    mutations: {
      change: (state, obj: { [name: string]: boolean | string }) => {
        Object.keys(obj).forEach((index) => {
          state[index] = obj[index];
        });
      },
    },
  });
});

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('infoContainer renders', () => {
  wrapper = mount(InfoContainer, {
    global: { plugins: [store] },
  });

  expect(wrapper.find('.infoContainer').exists()).toBeTruthy();
  expect(wrapper.findAll('.infoContainer-infoItem').length).toBe(4);

  const items = wrapper.findAll('.infoContainer-infoItem');
  expect(items[0].find('.infoItem-header').text()).toBe('From');
  expect(items[1].find('.infoItem-header').text()).toBe('To');
  expect(items[2].find('.infoItem-header').text()).toBe('Staked');
  expect(items[3].find('.infoItem-header').text()).toBe('APY');
});

it('watchs props changes', async () => {
  wrapper = mount(InfoContainer, {
    global: { plugins: [store] },
  });
  expect(wrapper.find('.infoContainer').classes()).toEqual(['infoContainer']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.infoContainer').classes()).toEqual(['infoContainer', 'infoContainer__selected']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.infoContainer').classes()).toEqual(['infoContainer']);
});

it('watchs outer store', async () => {
  wrapper = mount(InfoContainer, {
    global: { plugins: [store] },
  });

  const target = wrapper.findAll('.infoContainer-infoItem')[0];
  expect(target.find('.infoItem-value').text()).toBe('');

  store.commit('change', {
    From: 'after',
  });
  await wrapper.vm.$nextTick();
  expect(target.find('.infoItem-value').text()).toBe('after');
});
