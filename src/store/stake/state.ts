export const state = {
  isStaked: false,

  inputValue: '',
  // inputValue: 0,

  isReplenishAvailable: false,
  isRestakeAvailable: false,
  restakeCountdown: '00:00:09',
};

export type StateT = typeof state;
