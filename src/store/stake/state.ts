export const state = {
  isStaked: false,

  inputValue: '',

  staked: 0,
  apy: 100,
  from: new Date(),
  to: new Date(),
  amountMin: 0,
  amountMax: 0,

  // isReplenishAvailable: false,

  isRestakeAvailable: false,
  restakeCountdown: '00:00:09',
};

export type StateT = typeof state;
