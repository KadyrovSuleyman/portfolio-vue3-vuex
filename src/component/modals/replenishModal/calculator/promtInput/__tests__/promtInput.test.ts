import { mount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import PromtInput from '../promtInput.vue';

let wrapper = mount(PromtInput);
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('promtInput renders', () => {
  wrapper = mount(PromtInput);

  expect(wrapper.find('.promtInput').classes()).toEqual(['promtInput']);
  expect(wrapper.find('.promtInput-input').exists()).toBeTruthy();
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
      PromtInput,
    },

    template: `
      <div class='root'>
        <PromtInput :mods="mods"/>
        <button class="test-btn" @click="select"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.promtInput').classes()).toEqual(['promtInput']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.promtInput').classes()).toEqual(['promtInput', 'promtInput__selected']);

  await wr.find('.test-btn').trigger('click');
  expect(wr.find('.promtInput').classes()).toEqual(['promtInput']);

  wr.unmount();
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
  const Div = {
    props: [],

    setup() {
      const correct = ref('');
      const promtText = ref('before');

      const setCorrect = (value: string) => { correct.value = value; };
      const changePromt = (value: string) => { promtText.value = value; };

      return {
        correct,
        promtText,
        setCorrect,
        changePromt,
      };
    },
    components: {
      PromtInput,
    },

    template: `
      <div class='root'>
        <PromtInput :promtText="promtText" :correct="correct"/>

        <button class="correct-false" @click="setCorrect('false')"></button>
        <button class="correct-true" @click="setCorrect('true')"></button>
        <button class="correct-none" @click="setCorrect('')"></button>

        <button class="changePromt" @click="changePromt('after')"></button>
      </div>
    `,
  };
  const wr = mount(Div);
  expect(wr.find('.promtInput').classes()).toEqual(['promtInput']);
  expect(wr.find('.promtInput-span').exists()).toBeFalsy();

  await wr.find('.correct-true').trigger('click');
  expect(wr.find('.promtInput').classes()).toEqual(['promtInput', 'promtInput__correct_true']);
  expect(wr.find('.promtInput-span').exists()).toBeFalsy();

  await wr.find('.correct-false').trigger('click');
  expect(wr.find('.promtInput').classes()).toEqual(['promtInput', 'promtInput__correct_false']);
  expect(wr.find('.promtInput-span').classes())
    .toEqual(['promtInput-span', 'promtInput-span__correct_false']);

  await wr.find('.correct-none').trigger('click');
  expect(wr.find('.promtInput').classes()).toEqual(['promtInput']);
  expect(wr.find('.promtInput-span').exists()).toBeFalsy();

  await wr.find('.correct-false').trigger('click');
  expect(wr.find('.promtInput-span').text()).toBe('before');

  await wr.find('.changePromt').trigger('click');
  expect(wr.find('.promtInput-span').text()).toBe('after');

  wr.unmount();
});
