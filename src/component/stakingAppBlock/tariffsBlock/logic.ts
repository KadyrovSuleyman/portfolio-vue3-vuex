/* eslint-disable no-param-reassign */
export const getSelectListKey = (target: HTMLElement, className: string) => {
  while (target !== document.body) {
    if (target.parentElement?.classList.contains(className)) {
      break;
    }
    target = target.parentElement || document.body;
  }

  return target.querySelector('.tariffItem-period')?.textContent || '';
};

export const extractNumber = (input: string) => Number(input.matchAll(/^(\d+)/g).next().value[0]);
