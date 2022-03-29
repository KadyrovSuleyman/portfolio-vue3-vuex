import { addMods, formateClassName, ModsT } from '@/module/bem';

it('test addMods func', () => {
  expect(addMods(undefined, { selected: true })).toEqual(['']);

  const className = 'test-name';
  const modsMap = new Map<ModsT, string[]>([
    [
      {}, [`${className}`],
    ],
    [
      {
        selected: false,
      },
      [`${className}`],
    ],
    [
      {
        selected: true,
      },
      [`${className}`, `${className}__selected`],
    ],
    [
      {
        theme: 'dark',
      },
      [`${className}`, `${className}__theme_dark`],
    ],
    [
      {
        theme: 'dark',
        hidden: false,
        selected: true,
      },
      [`${className}`, `${className}__theme_dark`, `${className}__selected`],
    ],
    [
      {
        theme: undefined,
      },
      [`${className}`],
    ],
  ]);

  modsMap.forEach((res, mods) => {
    expect(addMods(className, mods)).toEqual(res);
  });
});

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
