/* eslint-disable no-param-reassign */

export const getWalletName = (target: HTMLElement, className: string) => {
  while (target !== document.body) {
    if (target.parentElement?.classList.contains(className)) {
      break;
    }
    target = target.parentElement || document.body;
  }

  return target.querySelector('span')?.textContent || '';
};

// ----------------------------
export const clickHandlerGenerator = (className = 'walletsList') => (payload: MouseEvent) => {
  payload.preventDefault();

  const targetItem = payload.target as HTMLElement;
  const key = getWalletName(targetItem, className);

  console.warn(`${key}: sending request`);
};
