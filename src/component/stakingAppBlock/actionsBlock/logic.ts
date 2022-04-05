import { Store } from 'vuex';
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
        store.commit('showConnectWallet');
      },
    };
  }

  if (!isWalletApproved) {
    return {
      text: 'Approve wallet',
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
    };
  }

  return {
    text: '',
  };
};

export default generateMainButtonProps;
