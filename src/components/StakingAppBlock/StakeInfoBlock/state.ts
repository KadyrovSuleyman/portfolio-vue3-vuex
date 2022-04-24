import { Store } from 'vuex';

export interface StateT {
  income: number,
}

const adaptState = (store: Store<any>): StateT => ({
  income: store.getters['stake/reward'],
});

export default adaptState;
