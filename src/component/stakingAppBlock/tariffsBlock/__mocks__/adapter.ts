import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  tariffsList: store.state.list,
  selectList: store.state.selectList,
});

export default adapt;
