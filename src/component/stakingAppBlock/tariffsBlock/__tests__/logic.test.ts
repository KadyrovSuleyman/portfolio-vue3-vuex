import { mount } from '@vue/test-utils';
import { getSelectListKey, selectToClosure } from '../logic';

it('selectToClosure', () => {
  const list = {
    '30 Days': undefined,
    '90 Days': undefined,
    '150 Days': undefined,
  };

  const select = (target: string) => selectToClosure(list, target);

  expect(list).toStrictEqual({
    '30 Days': undefined,
    '90 Days': undefined,
    '150 Days': undefined,
  });

  select('30 Days');
  expect(list).toStrictEqual({
    '30 Days': 'true',
    '90 Days': 'false',
    '150 Days': 'false',
  });

  select('90 Days');
  expect(list).toStrictEqual({
    '30 Days': 'false',
    '90 Days': 'true',
    '150 Days': 'false',
  });

  select('90 Days');
  expect(list).toStrictEqual({
    '30 Days': undefined,
    '90 Days': undefined,
    '150 Days': undefined,
  });

  select('150 Days');
  expect(list).toStrictEqual({
    '30 Days': 'false',
    '90 Days': 'false',
    '150 Days': 'true',
  });
});

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
