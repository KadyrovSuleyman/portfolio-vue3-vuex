/* eslint-disable no-param-reassign */
import { Store } from 'vuex';

const adaptState = (store: Store<any>) => ({
  tariffsList: store.state.list,
  selectList: store.state.selectList,
  select: store.state.select,
});

export default adaptState;
