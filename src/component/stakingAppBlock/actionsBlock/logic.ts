import { StateListT } from './adapter';

const generateMainButtonText = ({
  isWalletConnected,
  isWalletApproved,
  isWaiting,
  isStaked,
  isReplenishAvailable,
  isRestakeAvailable,
}: StateListT) => {
  if (isWaiting) {
    return 'Waiting';
  }

  if (!isWalletConnected) {
    return 'Connect wallet';
  }

  if (!isWalletApproved) {
    return 'Approve wallet';
  }

  if (!isStaked) {
    return 'Stake';
  }

  if (isRestakeAvailable) {
    return 'Restake';
  }

  if (isReplenishAvailable) {
    return 'Replenish';
  }

  return '';
};

export default generateMainButtonText;
