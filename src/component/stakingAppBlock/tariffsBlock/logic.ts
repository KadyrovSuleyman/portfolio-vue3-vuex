/* eslint-disable no-param-reassign */
import { SelectListT } from './adapter';

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
