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
        store.commit('modal/show', MODAL.connectWallet);
      },
    };
  }

  if (!isWalletApproved) {
    return {
      text: 'Approve wallet',
      handler: (store: Store<any>) => () => {
        store.commit('wallet/approve');
      },
    };
  }

  if (!isStaked) {
    return {
      text: 'Stake',
    };
  }

  if (isRestakeAvailable) {
    return {
      text: 'Restake',
    };
  }

  if (isReplenishAvailable) {
    return {
      text: 'Replenish',
      handler: (store: Store<any>) => () => {
        store.commit('modal/show', MODAL.replenish);
      },
    };
  }

  return {
    text: '',
  };
};

export default generateMainButtonProps;
