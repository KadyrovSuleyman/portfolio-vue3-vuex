/* eslint-disable no-param-reassign */
import { computed, ref } from 'vue';

import { TariffItemT } from './adapter';

export const selectMap = (list: TariffItemT[]) => {
  const res: { [key: string]: string | undefined } = {};

  list.forEach((tariff) => {
    res[tariff.period] = undefined;
  });

  return res;
}

export const selectToClosuree = (map: { [key: string]: string | undefined }, target: string) => {
  if (map[target] === undefined || map[target] === 'false') {
    Object.keys(map).forEach((key) => {
      map[key] = 'false';
    });
    map[target] = 'true';
    return;
  }

  if (map[target] === 'true') {
    Object.keys(map).forEach((key) => {
      map[key] = undefined;
    });
  }
};

// // ----------------------------
// export const clickHandlerToClosuree = (obj: { [name: string]: boolean }, payload: MouseEvent) => {
//   payload.preventDefault();

//   const targetItem = (payload.target as HTMLAnchorElement).textContent || '';
//   // console.warn(`${targetItem}: sending request`);
//   // -----------
//   // console.warn(`${targetItem}: sending answer`);
//   selectToClosuree(obj, targetItem);
// };
// export const clickHandle = (payload: MouseEvent) => clickHandlerToClosure(navItems.value, payload);
