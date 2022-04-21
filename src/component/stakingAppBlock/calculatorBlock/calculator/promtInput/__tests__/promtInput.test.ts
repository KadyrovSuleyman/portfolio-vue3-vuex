import { mount, VueWrapper } from '@vue/test-utils';
import { ref } from 'vue';
import PromtInput from '../promtInput.vue';

let wrapper: VueWrapper<any>;
afterEach(() => {
  wrapper.unmount();
});

it('promtInput renders', () => {
  wrapper = mount(PromtInput);

  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput']);
  expect(wrapper.find('.promtInput-input').exists()).toBeTruthy();
});

it('watchs props changes', async () => {
  wrapper = mount(PromtInput);
  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput']);

  await wrapper.setProps({
    mods: {
      selected: true,
    },
  });
  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput', 'promtInput__selected']);

  await wrapper.setProps({
    mods: {
      selected: false,
    },
  });
  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput']);
});

it('two-sides binding', async () => {
  const Div = {
    props: [],

    setup() {
      const text = ref('before');
      const onInput = (payload: KeyboardEvent) => {
        text.value = (payload.target as HTMLInputElement).value;
      };
      const changeText = () => { text.value = 'manual changed'; };

      return {
        text,
        onInput,
        changeText,
      };
    },
    components: {
      PromtInput,
    },

    template: `
      <div class='root'>
        <PromtInput :text="text" :onInput="onInput" />
        {{ text }}
        <button @click="changeText" />
      </div>
    `,
  };

  const wr = mount(Div);
  const input = wr.find('input');

  expect(input.html()).toBe('<input class="promtInput-input">');
  expect(input.element.value).toBe('before');
  expect(wr.text()).toBe('before');

  await input.setValue('after');
  await input.trigger('input');
  expect(input.element.value).toBe('after');
  expect(wr.text()).toBe('after');

  await wr.find('button').trigger('click');
  expect(input.element.value).toBe('manual changed');
  expect(wr.text()).toBe('manual changed');

  wr.unmount();
});

it('error shows', async () => {
  wrapper = mount(PromtInput);
  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput']);
  expect(wrapper.find('.promtInput-span').exists()).toBeFalsy();

  await wrapper.setProps({
    correct: 'true',
  });
  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput', 'promtInput__correct_true']);
  expect(wrapper.find('.promtInput-span').exists()).toBeFalsy();

  await wrapper.setProps({
    correct: 'false',
  });
  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput', 'promtInput__correct_false']);
  expect(wrapper.find('.promtInput-span').classes())
    .toEqual(['promtInput-span', 'promtInput-span__correct_false']);

  await wrapper.setProps({
    correct: undefined,
  });
  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput']);
  expect(wrapper.find('.promtInput-span').exists()).toBeFalsy();

  await wrapper.setProps({
    correct: 'false',
    promtText: 'before',
  });
  expect(wrapper.find('.promtInput-span').text()).toBe('before');

  await wrapper.setProps({
    correct: 'false',
    promtText: 'after',
  });
  expect(wrapper.find('.promtInput-span').text()).toBe('after');
});
