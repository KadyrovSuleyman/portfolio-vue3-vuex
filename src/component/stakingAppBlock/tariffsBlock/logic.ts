/* eslint-disable no-param-reassign */
import { Store } from 'vuex';

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

  const key = extractNumber(targetString);
  store.dispatch('tariff/select', key);
};
