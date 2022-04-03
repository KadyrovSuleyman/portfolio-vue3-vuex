/* eslint-disable no-param-reassign */
import { computed, ComputedRef, ref } from 'vue';
import { useStore } from 'vuex';

import adapt, { SelectListT, TariffItemT } from './adapter';

// export const selectMap = (list: TariffItemT[]) => {
//   const res: { [key: string]: string | undefined } = {};

//   list.forEach((tariff) => {
//     res[tariff.period] = undefined;
//   });

//   return res;
// };

// // type MapT = { [key: string]: string | undefined } | undefined;

// // export const selectMap = (list: TariffItemT[]) => computed(() => {
// //   // console.log(list);

// //   const res: { [key: string]: string | undefined } = {};

// //   list.forEach((tariff) => {
// //     res[tariff.period] = undefined;
// //   });

// //   // console.log(list);

// //   return res;
// // });

// // // ============================
// // export const selectToClosure = (
// //   map: ComputedRef<MapT>,
// //   target: string,
// // ) => {
// //   if (map === undefined || map.value === undefined) {
// //     return;
// //   }

// //   if (map.value[target] === undefined || map.value[target] === 'false') {
// //     Object.keys(map).forEach((key) => {
// //       map.value[key] = 'false';
// //     });
// //     map.value[target] = 'true';
// //     return;
// //   }

// //   if (map.value[target] === 'true') {
// //     Object.keys(map).forEach((key) => {
// //       map.value[key] = undefined;
// //     });
// //   }
// // };
// // // ============================

// // ============================
// export const selectToClosure = (
//   map: { [key: string]: string | undefined } | undefined,
//   target: string,
// ) => {
//   if (map === undefined) {
//     return;
//   }

//   if (map[target] === undefined || map[target] === 'false') {
//     Object.keys(map).forEach((key) => {
//       map[key] = 'false';
//     });
//     map[target] = 'true';
//     return;
//   }

//   if (map[target] === 'true') {
//     Object.keys(map).forEach((key) => {
//       map[key] = undefined;
//     });
//   }
// };
// // ============================

// // // ----------------------------
// // export const clickHandlerToClosure = (list: TariffItemT[], payload: MouseEvent) => {
// //   payload.preventDefault();

// //   const targetItem = (payload.target as HTMLDivElement);
// //   const key = targetItem.querySelector('.tariffItem-period')?.textContent || '';

// //   // console.warn(`${targetItem}: sending request`);
// //   // -----------
// //   // console.warn(`${targetItem}: sending answer`);

// //   const map = selectMap(list);
// //   selectToClosure(map.value, key);
// // };

// // // ----------------------------
// // export const clickHandlerToClosuree = (
// //   map: ComputedRef<{
// //     [key: string]: string | undefined;
// //   }>,
// //   payload: MouseEvent,
// // ) => {
// //   payload.preventDefault();

// //   const targetItem = (payload.target as HTMLDivElement);
// //   const key = targetItem.querySelector('.tariffItem-period')?.textContent || '';

// //   // console.log(key);

// //   // console.warn(`${targetItem}: sending request`);
// //   // -----------
// //   // console.warn(`${targetItem}: sending answer`);

// //   selectToClosure(map.value, key);

// //   // console.log(map.value);
// // };

// // ----------------------------
// export const clickHandlerToClosure = (
//   map: { [key: string]: string | undefined },
//   // map: any,
//   payload: MouseEvent,
// ) => {
//   // payload.preventDefault();

//   const targetItem = (payload.target as HTMLDivElement);
//   const key = targetItem.querySelector('.tariffItem-period')?.textContent || '';

//   // console.log(key);

//   // console.warn(`${targetItem}: sending request`);
//   // -----------
//   // console.warn(`${targetItem}: sending answer`);

//   selectToClosure(map, key);

//   // console.log(map.value);
// };

// // const store = useStore();
// // const { tariffsList } = adapt(store);

// // export const map = selectMap(tariffsList);

// // export const clickHandler = (payload: MouseEvent) => clickHandlerToClosure(map, payload);

// ************************************************
// ----------------------------
export const selectToClosure = (list: SelectListT, target: string) => {
  if (list === undefined) {
    return;
  }

  if (list[target] === undefined || list[target] === 'false') {
    Object.keys(list).forEach((key) => {
      list[key] = 'false';
    });
    list[target] = 'true';
    return;
  }

  if (list[target] === 'true') {
    Object.keys(list).forEach((key) => {
      list[key] = undefined;
    });
  }
};

export const getSelectListKey = (target: HTMLElement, className: string) => {
  while (target !== document.body) {
    if (target.parentElement?.classList.contains(className)) {
      break;
    }
    target = target.parentElement || document.body;
  }

  return target.querySelector('.tariffItem-period')?.textContent || '';
};

// ----------------------------
export const clickHandlerGenerator = ({ list, className = 'tariffItem' } : {
  list: SelectListT,
  className: string,
}) => (payload: MouseEvent) => {
  payload.preventDefault();

  const targetItem = payload.target as HTMLElement;
  const key = getSelectListKey(targetItem, className);

  // console.warn(`${targetItem}: sending request`);
  // -----------
  // console.warn(`${targetItem}: sending answer`);
  selectToClosure(list, key);
};
