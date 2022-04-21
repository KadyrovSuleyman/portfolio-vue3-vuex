import { Store } from 'vuex';

const adapt = (store: Store<any>) => ({
  tariffsList: store.state.tariff.list,
  selectList: store.getters['tariff/selectedList'],
});

export default adapt;
