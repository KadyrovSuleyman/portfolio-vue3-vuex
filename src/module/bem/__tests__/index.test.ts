import { formateClassName, ModsT } from '@/module/bem';

it('test formateClassName func', () => {
  const block = 'block';
  const elem = 'elem';
  const be = 'block-elem';

  expect(formateClassName(undefined, elem, {})).toEqual(['elem']);
  expect(formateClassName(undefined, elem, { selected: true })).toEqual(['elem', 'elem__selected']);

  const modsMap = new Map<ModsT, string[]>([
    [
      {}, [`${be}`],
    ],
    [
      {
        selected: false,
      },
      [`${be}`],
    ],
    [
      {
        selected: true,
      },
      [`${be}`, `${be}__selected`],
    ],
    [
      {
        theme: 'dark',
      },
      [`${be}`, `${be}__theme_dark`],
    ],
    [
      {
        theme: 'dark',
        hidden: false,
        selected: true,
      },
      [`${be}`, `${be}__theme_dark`, `${be}__selected`],
    ],
    [
      {
        theme: undefined,
      },
      [`${be}`],
    ],
  ]);

  modsMap.forEach((res, mods) => {
    expect(formateClassName(block, elem, mods)).toEqual(res);
  });
});
