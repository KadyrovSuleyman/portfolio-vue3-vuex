import { GetterTree } from 'vuex';
import { StateT } from './state';

const getters: GetterTree<StateT, any> = {
  name: (state: StateT) => state.list[state.index].name,
  abbreviation: (state: StateT) => state.list[state.index].abbreviation,
  icon: (state: StateT) => state.list[state.index].icon,
};

export default getters;
