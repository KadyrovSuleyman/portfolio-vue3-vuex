import { TariffT } from '@/store/tariff/types.d';
import { Store } from 'vuex';

export interface StateT {
  tariffsList: TariffT[],
  selectList: { [period: number]: string | undefined },
  select: (period: number) => Promise<any>,
}

const adapt = (store: Store<any>): StateT => ({
  tariffsList: store.state.tariff.list,
  selectList: store.getters['tariff/selectedList'],
  select: (period: number) => store.dispatch('tariff/select', period),
});

export default adapt;
