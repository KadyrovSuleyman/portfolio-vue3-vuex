import { CoinT } from './types.d';

export const state = {
  list: [] as CoinT[],
  index: 0,
};

export type StateT = typeof state;
