import { createLogger, createStore } from 'vuex';
import types from './mutation-types';

// const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  state: {
    count: 0,
  },
  getters: {
  },
  mutations: {
    [types.INCREMENT]: (state, n = 1) => { state.count += n; },
  },
  actions: {
    [types.INCREMENT]: ({ commit }, n: number) => setTimeout(() => {
      commit(types.INCREMENT, n);
    }, 1000),
  },
  modules: {
  },

  plugins: [createLogger()],
});
