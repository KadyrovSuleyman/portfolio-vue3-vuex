import state from './state';
import mutations from './mutations';

const modal = {
  namespaced: true,

  state,
  mutations,
};

export default modal;
