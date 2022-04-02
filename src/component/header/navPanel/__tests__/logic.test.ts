import { mount } from '@vue/test-utils';
import linkVue from '@/element/link/link.vue';

import { clickHandlerToClosure, selectToClosure } from '../logic';

it('select works', () => {
  const obj = {
    Stacking: true,
    Bridge: false,
    SHO: false,
    SHON: false,
  };

  const select = (item: string) => selectToClosure(obj, item);

  select('Bridge');
  expect(obj).toEqual({
    Stacking: false, Bridge: true, SHO: false, SHON: false,
  });

  select('SHO');
  expect(obj).toEqual({
    Stacking: false, Bridge: false, SHO: true, SHON: false,
  });

  select('SHON');
  expect(obj).toEqual({
    Stacking: false, Bridge: false, SHO: false, SHON: true,
  });

  select('Stacking');
  expect(obj).toEqual({
    Stacking: true, Bridge: false, SHO: false, SHON: false,
  });

  select('fakeaf');
  expect(obj).toEqual({
    Stacking: true, Bridge: false, SHO: false, SHON: false,
  });

  select('Bridge');
  select('fakeaf');
  expect(obj).toEqual({
    Stacking: false, Bridge: true, SHO: false, SHON: false,
  });
});

it('click handler works', async () => {
  const obj = {
    Stacking: true,
    Bridge: false,
    SHO: false,
    SHON: false,
  };

  const clickHandler = (payload: MouseEvent) => clickHandlerToClosure(obj, payload);

  const wrapper = mount(linkVue, {
    props: {
      onClick: clickHandler,
    },
    slots: {
      default: 'Bridge',
    },
  });

  expect(obj).toEqual({
    Stacking: true, Bridge: false, SHO: false, SHON: false,
  });

  await wrapper.find('a').trigger('click');
  expect(obj).toEqual({
    Stacking: false, Bridge: true, SHO: false, SHON: false,
  });
});
