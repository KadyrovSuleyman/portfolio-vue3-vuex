import { Store } from 'vuex';
import MODAL from '@/store/modal/types';
import { StateListT } from './adapter';

export type MainButtonPropsT = {
  text?: string,
  handler?: CallableFunction,
}

const generateMainButtonProps = ({
  isWalletConnected,
  isWalletApproved,
  isWaiting,
  isStaked,
  isReplenishAvailable,
  isRestakeAvailable,
}: StateListT): MainButtonPropsT => {
  if (isWaiting) {
    return {
      text: 'Waiting',
    };
  }

  if (!isWalletConnected) {
    return {
      text: 'Connect wallet',
      handler: (store: Store<any>) => () => {
        store.dispatch('waiting/connectWallet');
      },
    };
  }

  if (!isWalletApproved) {
    return {
      text: 'Approve wallet',
      handler: (store: Store<any>) => () => {
        store.dispatch('waiting/approveWallet');
      },
    };
  }

  if (!isStaked) {
    return {
      text: 'Stake',
      handler: (store: Store<any>) => () => {
        // store.dispatch('stake/stake');
        store.dispatch('waiting/stake');
      },
    };
  }

  if (isRestakeAvailable) {
    return {
      text: 'Restake',
      handler: (store: Store<any>) => () => {
        store.dispatch('stake/restake');
      },
    };
  }

  if (isReplenishAvailable) {
    return {
      text: 'Replenish',
      handler: (store: Store<any>) => () => {
        store.dispatch('modal/show', MODAL.replenish);
      },
    };
  }

  return {
    text: '',
  };
};
export default generateMainButtonProps;

export const generateUnstakeHandler = (store: Store<any>) => () => {
  store.dispatch('stake/unstake');
};
