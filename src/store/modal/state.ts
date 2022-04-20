/* eslint-disable no-shadow */
export enum MODAL {
  connectWallet = 'connectWallet',
  transactionConfirmed = 'transactionConfirmed',
  replenish = 'replenish',
  copied = 'copied',
}

const state: Record<string, boolean> = {};
Object.keys(MODAL).forEach((keys) => { state[keys] = false; });
export default state;

export type StateT = typeof state;
