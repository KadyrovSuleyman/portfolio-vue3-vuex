import { mount } from '@vue/test-utils';
import Input from '@/element/input/input.vue';
import { ref } from 'vue';

let wrapper = mount(Input, {});
wrapper.unmount();
afterEach(() => {
  wrapper.unmount();
});

it('input renders', () => {
  wrapper = mount(Input);

  const input = wrapper.get('input');

  expect(input).not.toBeNull();
  expect(input.html()).toBe('<input class="input">');
});

describe('input formates classes correctly', () => {
  afterEach(() => {
    wrapper.unmount();
  });

  it('default element name', () => {
    wrapper = mount(Input, {
      props: {},
    });

    const input = wrapper.get('input');

    expect(input).not.toBeNull();
    expect(input.classes()).toEqual(['input']);
  });

  it('custom element name', () => {
    wrapper = mount(Input, {
      props: { elem: 'custom' },
    });

    const input = wrapper.get('input');

    expect(input).not.toBeNull();
    expect(input.classes()).toEqual(['custom']);
  });

  it('custom block name', () => {
    wrapper = mount(Input, {
      props: { block: 'parent' },
    });

    const input = wrapper.get('input');

    expect(input).not.toBeNull();
    expect(input.classes()).toEqual(['parent-input']);
  });

  it('custom block-element name', () => {
    wrapper = mount(Input, {
      props: { block: 'parent', elem: 'custom' },
    });

    const input = wrapper.get('input');

    expect(input).not.toBeNull();
    expect(input.classes()).toEqual(['parent-custom']);
  });

  it('with mods', () => {
    wrapper = mount(Input, {
      props: {
        mods: {
          enabled: true,
          falsy: false,
          theme: 'dark',
        },
      },
    });

    const input = wrapper.get('input');

    expect(input).not.toBeNull();
    expect(input.classes()).toEqual(['input', 'input__enabled', 'input__theme_dark']);
  });

  it('with all bem props', () => {
    wrapper = mount(Input, {
      props: {
        block: 'parent',
        elem: 'custom',
        mods: {
          enabled: true,
          falsy: false,
          theme: 'dark',
        },
      },
    });

    const input = wrapper.get('input');

    expect(input).not.toBeNull();
    expect(input.classes()).toEqual(['parent-custom', 'parent-custom__enabled', 'parent-custom__theme_dark']);
  });
});

it('placeholder watches', async () => {
  const Div = {
    props: [],

    setup() {
      const state = ref('before');
      const changeState = () => {
        state.value = 'after';
      };

      return {
        state,
        changeState,
      };
    },
    components: {
      Input,
    },

    template: `
      <div class='root'>
        <Input :placeholder="state" />
        <button @click="changeState"></button>
      </div>
    `,
  };

  const wr = mount(Div);
  const input = wr.find('input');
  const button = wr.find('button');

  expect(input.html()).toBe('<input class="input" placeholder="before">');

  await button.trigger('click');
  expect(input.html()).toBe('<input class="input" placeholder="after">');

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
      Input,
    },

    template: `
      <div class='root'>
        <Input :text="text" :onInput="onInput" />
        {{ text }}
        <button @click="changeText" />
      </div>
    `,
  };

  const wr = mount(Div);
  const input = wr.find('input');

  expect(input.html()).toBe('<input class="input">');
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
