/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
// import { SelectListT } from './adapter';

// export const selectToClosure = (list: SelectListT, target: number) => {
//   if (list === undefined) {
//     return;
//   }

//   if (list[target] === undefined || list[target] === 'false') {
//     Object.keys(list).forEach((key) => {
//       list[Number(key)] = 'false';
//     });
//     list[target] = 'true';
//     return;
//   }

//   if (list[target] === 'true') {
//     Object.keys(list).forEach((key) => {
//       list[Number(key)] = undefined;
//     });
//   }
// };

export const getSelectListKey = (target: HTMLElement, className: string) => {
  while (target !== document.body) {
    if (target.parentElement?.classList.contains(className)) {
      break;
    }
    target = target.parentElement || document.body;
  }

  return target.querySelector('.tariffItem-period')?.textContent || '';
};

const extractNumber = (input: string) => Number(input.matchAll(/^(\d+)/g).next().value[0]);

// ----------------------------
export const clickHandlerGenerator = ({ store, className = 'tariffItem' } : {
  className: string,
  store: Store<any>,
}) => (payload: MouseEvent) => {
  payload.preventDefault();

  const targetItem = payload.target as HTMLElement;
  const targetString = getSelectListKey(targetItem, className);

  // console.warn(`${targetItem}: sending request`);
  // -----------
  // console.warn(`${targetItem}: sending answer`);

  const key = extractNumber(targetString);
  store.commit('tariff/select', key);
};
