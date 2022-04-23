import { Module } from 'vuex';
import { state, StateT } from './state';
import mutations from './mutations';
import actions from './actions';

const wallet: Module<StateT, any> = {
  namespaced: true,

  state,
  mutations,
  actions,
};

export default wallet;
