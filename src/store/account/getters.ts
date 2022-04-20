import { GetterTree } from 'vuex';
import { StateT } from './state';

const getters: GetterTree<StateT, any> = {
  balance: (state: StateT, getters_: any, rootState: any, rootGetters: any) => state.balance[rootGetters['coin/name']],
};

export default getters;
