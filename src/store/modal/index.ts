import { Module } from 'vuex';
import { state, StateT } from './state';
import mutations from './mutations';

const modal: Module<StateT, any> = {
  namespaced: true,

  state,
  mutations,
};

export default modal;
