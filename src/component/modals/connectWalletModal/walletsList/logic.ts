/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
import MODAL from '@/store/modal/types';

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
export const clickHandlerGenerator = (store: Store<any>, className = 'walletsList') => (payload: MouseEvent) => {
  payload.preventDefault();

  const targetItem = payload.target as HTMLElement;
  const name = getWalletName(targetItem, className);

  // store.dispatch('wallet/select', name);
  // store.dispatch('modal/hide', MODAL.connectWallet);
  store.dispatch('waiting/selectWallet', name);
};
