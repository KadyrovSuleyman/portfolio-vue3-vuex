import { BalanceT } from './types.d';

export const state = {
  address: '',
  balance: {} as BalanceT,
};

export type StateT = typeof state;
