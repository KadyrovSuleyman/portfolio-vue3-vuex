import { GetterTree } from 'vuex';
import { StateT } from './state';

const getters: GetterTree<StateT, any> = {
  selectedList: (state: StateT) => {
    const res: {[period: number]: string | undefined} = {};

    if (state.index === -1) {
      state.list.forEach((tariff) => {
        res[tariff.period] = undefined;
      });
      return res;
    }

    state.list.forEach((tariff, index) => {
      res[tariff.period] = String(state.index === index);
    });
    return res;
  },
};

export default getters;
