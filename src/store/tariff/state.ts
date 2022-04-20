import { TariffT } from './types.d';

export const state = {
  list: [] as TariffT[],
  index: -1,
};

export type StateT = typeof state;
