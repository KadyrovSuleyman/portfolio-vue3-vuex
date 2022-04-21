import { mount, VueWrapper } from '@vue/test-utils';
import { ref } from 'vue';
import InfoItem from '../infoItem.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('infoItem renders', () => {
  wrapper = mount(InfoItem);
  expect(wrapper.find('.infoItem').exists()).toBeTruthy();

  expect(wrapper.find('.infoItem-header').exists()).toBeTruthy();
  expect(wrapper.find('.infoItem-value').exists()).toBeTruthy();
});

it('watchs props changes', async () => {
  wrapper = mount(InfoItem);
  expect(wrapper.find('.infoItem').classes()).toEqual(['infoItem']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.infoItem').classes()).toEqual(['infoItem', 'infoItem__selected']);

  await wrapper.setProps({
    ...wrapper.props,
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.infoItem').classes()).toEqual(['infoItem']);
});

it('watchs slots', async () => {
  const Div = {
    props: [],

    setup() {
      const header = ref('from');
      const value = ref('before');
      const changeHeader = () => {
        header.value = 'to';
      };
      const changeValue = () => {
        value.value = 'after';
      };

      return {
        header,
        value,
        changeHeader,
        changeValue,
      };
    },
    components: {
      InfoItem,
    },

    template: `
      <div class='root'>
        <InfoItem>
          <template v-slot:header>
            {{ header }}
          </template>
          {{ value }}
        </InfoItem>
        <button class="btn-header" @click="changeHeader"></button>
        <button class="btn-value" @click="changeValue"></button>
      </div>
    `,
  };

  const wr = mount(Div);
  expect(wr.find('.infoItem').exists()).toBeTruthy();
  expect(wr.find('.infoItem-header').text()).toBe('from');
  expect(wr.find('.infoItem-value').text()).toBe('before');

  await wr.find('.btn-header').trigger('click');
  expect(wr.find('.infoItem-header').text()).toBe('to');

  await wr.find('.btn-value').trigger('click');
  expect(wr.find('.infoItem-value').text()).toBe('after');
});
