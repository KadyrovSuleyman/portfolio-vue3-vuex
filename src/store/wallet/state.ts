import { WalletT } from './types.d';

export const state = {
  isApproved: false,

  list: [] as WalletT[],
  index: -1,
};

export type StateT = typeof state;
