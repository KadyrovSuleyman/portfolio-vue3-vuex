import { Module } from 'vuex';
import { state, StateT } from './state';
import mutations from './mutations';
import actions from './actions';

const modal: Module<StateT, any> = {
  namespaced: true,

  state,
  mutations,
  actions,
};

export default modal;
