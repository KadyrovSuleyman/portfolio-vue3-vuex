/* eslint-disable no-param-reassign */
import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  tariffsList: store.state.list,
  selectList: store.state.selectList,
  select: store.state.select,
});

export default adapt;
