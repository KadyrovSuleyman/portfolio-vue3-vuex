export type ModsT = { [mod: string]: string | boolean | undefined }

export const formateClassName = (
  block: string | undefined,
  element: string,
  mods: ModsT,
) => {
  if (!element) {
    return [''];
  }

  const be = block ? `${block}-${element}` : element;
  const res: string[] = [be];

  Object.keys(mods).forEach((mod) => {
    if (typeof mods[mod] === 'string') {
      if (mods[mod] === '') {
        return true;
      }
      return res.push(`${be}__${mod}_${mods[mod]}`);
    }

    if (mods[mod] === true) {
      return res.push(`${be}__${mod}`);
    }

    return true;
  });

  return res;
};
