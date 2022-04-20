import { StateT, MODAL } from './state';

const mutations = {
  show: (state: StateT, payload: MODAL) => { state[payload] = true; },
  hide: (state: StateT, payload: MODAL) => { state[payload] = false; },
};

export default mutations;
