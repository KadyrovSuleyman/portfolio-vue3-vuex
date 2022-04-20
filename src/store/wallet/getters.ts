import { GetterTree } from 'vuex';
import { StateT } from './state';

const getters: GetterTree<StateT, any> = {
  name: (state: StateT) => state.list[state.index].name,
  icon: (state: StateT) => state.list[state.index].icon,

  isConnected: (state: StateT) => state.index !== -1,
};

export default getters;
