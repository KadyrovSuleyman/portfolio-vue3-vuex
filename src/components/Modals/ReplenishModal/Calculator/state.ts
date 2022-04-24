import { Store } from 'vuex';

export interface StateT {
  value: string,
  setValue: (input: string) => void,

  maxValue: number,
  replenish: (input: string) => Promise<any>,
}

const adaptState = (store: Store<any>, props: any): StateT => ({
  maxValue: store.getters['stake/replenishMax'],
  replenish: (input: string) => store.dispatch('waiting/replenish', Number(input)),

  value: props.value,
  setValue: props.setValue,
});

export default adaptState;
