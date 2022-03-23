import { addMods, ModsT } from '@/module/bem';

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
