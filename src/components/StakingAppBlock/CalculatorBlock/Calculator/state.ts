import { Store } from 'vuex';

export interface StateT {
  maxValue: number,
  minValue: number,
  period: number,
  apy: number,

  disabled: boolean,

  text: string,
  setText: (newInput: string) => void,

  reward: number,

  submit: () => Promise<any>,
}

const adaptState = (store: Store<any>): StateT => ({
  maxValue: store.getters['tariff/amountMax'],
  minValue: store.getters['tariff/amountMin'],
  period: store.getters['tariff/period'],
  apy: store.getters['tariff/apy'],

  disabled: !store.getters['stake/isAllowed'],

  text: store.state.stake.inputValue,
  setText: (newInput: string) => store.commit('stake/input', newInput),

  reward: store.getters['stake/reward'],

  submit: () => store.dispatch('waiting/stake'),
});

export default adaptState;
