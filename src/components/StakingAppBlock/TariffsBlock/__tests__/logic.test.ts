import { mount } from '@vue/test-utils';
import { getSelectListKey } from '../logic';

it('getSelectListKey', () => {
  const Div = {
    props: [],

    setup() {
      return {};
    },

    template: `
    <div class="root">
      <div class="root-target">
        <div class="target-scum">
          <span class="target-span">fake</span>
        </div>
        <button class="target-another">
          <div class="another-div">divi</div>
        </button>
        <div class="target-tariffItem">
          <span class="tariffItem-period">catcha!</span>
        </div>
      </div>
    </div>
  `,
  };

  const wr = mount(Div);
  expect(wr.html()).not.toBeNull();

  expect(getSelectListKey(
    wr.find('.target-span').element as HTMLElement,
    'root',
  )).toBe('catcha!');
});
