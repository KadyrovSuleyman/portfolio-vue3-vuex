import MODAL from './types';

export const state: Record<string, boolean> = {};
Object.keys(MODAL).forEach((keys) => { state[keys] = false; });

export type StateT = typeof state;
