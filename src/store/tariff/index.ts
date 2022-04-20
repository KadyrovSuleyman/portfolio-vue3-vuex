import { Module } from 'vuex';
import { state, StateT } from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const wallet: Module<StateT, any> = {
  namespaced: true,

  state,
  mutations,
  getters,
  actions,
};

export default wallet;
