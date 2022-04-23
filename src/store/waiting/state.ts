import WAIT from './types';

export const state: Record<string, boolean> = {};
Object.keys(WAIT).forEach((keys) => { state[keys] = false; });

export type StateT = typeof state;
