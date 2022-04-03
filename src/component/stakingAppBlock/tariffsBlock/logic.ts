/* eslint-disable no-param-reassign */
import { computed, ComputedRef, ref } from 'vue';

import { TariffItemT } from './adapter';

// export const selectMap = (list: TariffItemT[]) => {
//   const res: { [key: string]: string | undefined } = {};

//   list.forEach((tariff) => {
//     res[tariff.period] = undefined;
//   });

//   return res;
// }

export const selectMap = (list: TariffItemT[]) => computed(() => {
  const res: { [key: string]: string | undefined } = {};

  list.forEach((tariff) => {
    res[tariff.period] = undefined;
  });

  // console.log(list);

  return res;
});

// ============================

export const selectToClosure = (map: { [key: string]: string | undefined }, target: string) => {
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

// ----------------------------
export const clickHandlerToClosure = (list: TariffItemT[], payload: MouseEvent) => {
  payload.preventDefault();

  const targetItem = (payload.target as HTMLDivElement);
  const key = targetItem.querySelector('.tariffItem-period')?.textContent || '';

  // console.warn(`${targetItem}: sending request`);
  // -----------
  // console.warn(`${targetItem}: sending answer`);

  const map = selectMap(list);
  selectToClosure(map.value, key);
};

// // ----------------------------
// export const clickHandlerToClosuree = (
//   map: ComputedRef<{
//     [key: string]: string | undefined;
//   }>,
//   payload: MouseEvent,
// ) => {
//   payload.preventDefault();

//   const targetItem = (payload.target as HTMLDivElement);
//   const key = targetItem.querySelector('.tariffItem-period')?.textContent || '';

//   // console.log(key);

//   // console.warn(`${targetItem}: sending request`);
//   // -----------
//   // console.warn(`${targetItem}: sending answer`);

//   selectToClosure(map.value, key);

//   // console.log(map.value);
// };

// // ----------------------------
// export const clickHandlerToClosure = (
//   map: { [key: string]: string | undefined },
//   // map: any,
//   payload: MouseEvent,
// ) => {
//   payload.preventDefault();

//   const targetItem = (payload.target as HTMLDivElement);
//   const key = targetItem.querySelector('.tariffItem-period')?.textContent || '';

//   console.log(key);

//   // console.warn(`${targetItem}: sending request`);
//   // -----------
//   // console.warn(`${targetItem}: sending answer`);

//   selectToClosure(map, key);

//   // console.log(map.value);
// };
