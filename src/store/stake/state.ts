export const state = {
  isStaked: false,

  isReplenishAvailable: false,
  isRestakeAvailable: false,
  restakeCountdown: '00:00:09',
};

export type StateT = typeof state;
