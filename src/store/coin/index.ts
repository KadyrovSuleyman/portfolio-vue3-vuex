import { Module } from 'vuex';
import { state, StateT } from './state';
import mutations from './mutations';
import getters from './getters';

const wallet: Module<StateT, any> = {
  namespaced: true,

  state,
  mutations,
  getters,
};

export default wallet;
